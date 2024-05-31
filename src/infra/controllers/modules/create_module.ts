import {
  ConflictException,
  Controller,
  HttpCode,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { TEnv } from "src/infra/env";
import { ModulesRepository } from "src/infra/repositories/implementations/modulesRepository";
import { UploadFileService } from "src/infra/services/fileUploadService";
import { CreateModuleUseCase } from "src/infra/useCases/modules/createModuleUseCase";
import { formatSlug } from "src/utils/formatSlug";
import { z } from "zod";

const createModuleBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  duration: z.string().optional(),
  cover_url: z.string().optional(),
  courseId: z.string().optional(),
});

@Controller("/modules")
@UseGuards(AuthGuard("jwt"))
export class CreateModuleController {
  constructor(
    private createModuleUseCase: CreateModuleUseCase,
    private uploadFileService: UploadFileService,
    private configService: ConfigService<TEnv, true>,
    private modulesRepository: ModulesRepository
  ) {}
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor("file"))
  async handle(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const { name, description, duration, courseId } =
      createModuleBodySchema.parse(req.body);

    const parsedDuration = parseInt(duration);

    const isBodyValidated = createModuleBodySchema.safeParse(req.body);

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    if (!name) {
      throw new ConflictException("name is required");
    }

    if (!description) {
      throw new ConflictException("description is required");
    }

    if (!duration) {
      throw new ConflictException("duration is required");
    }

    if (!isBodyValidated) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    const moduleAlreadyExists =
      await this.modulesRepository.getModuleByName(name);

    if (moduleAlreadyExists) {
      throw new ConflictException(
        "Already exists a module for the provided name"
      );
    }

    const blobStorageContainerName = this.configService.get(
      "AZURE_BLOB_STORAGE_MODULES_COVERS_CONTAINER_NAME",
      { infer: true }
    );

    const fileExtension = file ? file.originalname.split(".")[1] : '';

    const uploadedFile = file
      ? await this.uploadFileService.uploadFile(
          file.buffer,
          formatSlug(name) + "-cover." + fileExtension,
          blobStorageContainerName
        )
      : null;

    const createdModule = await this.createModuleUseCase.execute({
      name,
      courseId,
      description,
      cover_url: uploadedFile,
      duration: parsedDuration,
    });

    return createdModule;
  }
}
