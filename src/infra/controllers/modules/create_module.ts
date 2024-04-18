import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { CreateModuleUseCase } from "src/infra/useCases/modules/createModuleUseCase";
import { z } from "zod";

const createModuleBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().optional(),
  cover_url: z.string().optional(),
  courseId: z.string().optional(),
});

type CreateModuleBodySchema = z.infer<typeof createModuleBodySchema>;

@Controller("/modules")
export class CreateModuleController {
  constructor(private createModuleUseCase: CreateModuleUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateModuleBodySchema) {
    const { name, cover_url, description, duration, courseId } =
      createModuleBodySchema.parse(body);

    const isBodyValidated = createModuleBodySchema.safeParse(body);

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    if (!name) {
      throw new ConflictException("name is required");
    }

    if (!cover_url) {
      throw new ConflictException("cover_url is required");
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

    const createdModule = await this.createModuleUseCase.execute({
      name,
      courseId,
      description,
      cover_url,
      duration,
    });

    return createdModule;
  }
}
