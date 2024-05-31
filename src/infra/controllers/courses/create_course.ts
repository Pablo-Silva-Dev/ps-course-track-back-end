import {
  ConflictException,
  Controller,
  HttpCode,
  Inject,
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
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";
import { UploadFileService } from "src/infra/services/fileUploadService";
import { CreateCourseUseCase } from "src/infra/useCases/courses/createCourseUseCase";
import { formatSlug } from "src/utils/formatSlug";
import { z } from "zod";

const createCourseBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  duration: z.string().optional(),
  cover_url: z.string().optional(),
});

@Controller("/courses")
@UseGuards(AuthGuard("jwt"))
export class CreateCourseController {
  constructor(
    @Inject(CreateCourseUseCase)
    private createCourseUseCase: CreateCourseUseCase,
    private coursesRepository: CoursesRepository,
    private uploadFileService: UploadFileService,
    private config: ConfigService<TEnv, true>
  ) {}

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor("file"))
  async handle(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const { name, description, duration } = req.body;

    const parsedDuration = parseInt(duration);

    const isBodyValidated = createCourseBodySchema.safeParse(req.body);

    if (!name) {
      throw new ConflictException("name is required");
    }

    if (!description) {
      throw new ConflictException("description is required");
    }

    if (!duration) {
      throw new ConflictException("duration is required");
    }

    if (!file) {
      throw new ConflictException("select a file to upload as cover");
    }

    if (!isBodyValidated) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    const courseAlreadyExists =
      await this.coursesRepository.getCourseByName(name);

    if (courseAlreadyExists) {
      throw new ConflictException(
        "Already exists a course for the provided name"
      );
    }

    const blobStorageContainerName = this.config.get(
      "AZURE_BLOB_STORAGE_COURSES_COVERS_CONTAINER_NAME",
      { infer: true }
    );

    const fileExtension = file.originalname.split(".")[1];

    const uploadedFile = await this.uploadFileService.uploadFile(
      file.buffer,
      formatSlug(name) + "-cover." + fileExtension,
      blobStorageContainerName
    );

    const createdCourse = await this.createCourseUseCase.execute({
      name,
      cover_url: uploadedFile,
      description,
      duration: parsedDuration,
    });
    return createdCourse;
  }
}
