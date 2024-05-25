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
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express";
import { Request } from "express";
import { ClassesRepository } from "src/infra/repositories/implementations/classesRepository";
import { UploadFileService } from "src/infra/services/fileUploadService";
import { CreateClassUseCase } from "src/infra/useCases/classes/createClassUseCase";

@Controller("/classes")
@UseGuards(AuthGuard("jwt"))
export class CreateClassController {
  constructor(
    private createClassUseCase: CreateClassUseCase,
    private classesRepository: ClassesRepository,
    private uploadFileService: UploadFileService
  ) {}
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor("file"))
  async handle(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const { name, description, duration, moduleId, tutorId, courseId } =
      req.body;

    const parsedDuration = parseInt(duration);

    const classAlreadyExists =
    await this.classesRepository.getClassByName(name);

    if (!name) {
      throw new ConflictException("name is required");
    }

    if (!description) {
      throw new ConflictException("description is required");
    }

    if (!duration) {
      throw new ConflictException("duration is required");
    }

    if (!moduleId) {
      throw new ConflictException("moduleId is required");
    }

    if (!tutorId) {
      throw new ConflictException("tutorId is required");
    }

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    
    if (classAlreadyExists) {
      throw new ConflictException(
        "Already exists a class for the provided name"
      );
    }

    const fileUrl = await this.uploadFileService.uploadFile(
      file.buffer,
      file.originalname
    );

    const createdClass = await this.createClassUseCase.execute({
      name,
      description,
      url: fileUrl,
      duration: parsedDuration,
      moduleId,
      tutorId,
      courseId,
    });

    return createdClass;
  }
}
