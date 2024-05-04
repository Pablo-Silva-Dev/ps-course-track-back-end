import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateClassUseCase } from "src/infra/useCases/classes/createClassUseCase";
import { z } from "zod";

const createClassBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  url: z.string().optional(),
  duration: z.number().optional(),
  moduleId: z.string().optional(),
  tutorId: z.string().optional(),
  courseId: z.string().optional(),
});

type CreateClassBodySchema = z.infer<typeof createClassBodySchema>;

@Controller("/classes")
@UseGuards(AuthGuard("jwt"))
export class CreateClassController {
  constructor(private createClassUseCase: CreateClassUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateClassBodySchema) {
    const { name, description, url, duration, moduleId, tutorId, courseId } =
      createClassBodySchema.parse(body);

    const isBodyValidated = await createClassBodySchema.safeParse(body);

    if (!name) {
      throw new ConflictException("name is required");
    }

    if (!description) {
      throw new ConflictException("description is required");
    }

    if (!url) {
      throw new ConflictException("url is required");
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

    if (!isBodyValidated) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    const createdClass = await this.createClassUseCase.execute({
      name,
      description,
      url,
      duration,
      moduleId,
      tutorId,
      courseId,
    });
    return createdClass;
  }
}
