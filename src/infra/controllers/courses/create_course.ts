import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateCourseUseCase } from "src/infra/useCases/courses/createCourseUseCase";
import { z } from "zod";

const createCourseBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().optional(),
  cover_url: z.string().optional(),
});

type CreateCourseBodySchema = z.infer<typeof createCourseBodySchema>;

@Controller("/courses")
@UseGuards(AuthGuard("jwt"))
export class CreateCourseController {
  constructor(
    @Inject(CreateCourseUseCase)
    private createCourseUseCase: CreateCourseUseCase
  ) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateCourseBodySchema) {
    const { name, cover_url, description, duration } =
      createCourseBodySchema.parse(body);

    const isBodyValidated = createCourseBodySchema.safeParse(body);

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

    const createdCourse = await this.createCourseUseCase.execute({
      name,
      cover_url,
      description,
      duration,
    });
    return createdCourse;
  }
}
