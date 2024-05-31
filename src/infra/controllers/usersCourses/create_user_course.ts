import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";
import { CreateUserCourseUseCase } from "../../useCases/usersCourses/createUserCourseUseCase";

const createUserCourseBodySchema = z.object({
  userId: z.string(),
  courseId: z.string(),
});

type CreateUserCourseBodySchema = z.infer<typeof createUserCourseBodySchema>;

@Controller("/users-courses")
@UseGuards(AuthGuard("jwt"))
export class CreateUserCourseController {
  constructor(private createUserCourseUseCase: CreateUserCourseUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateUserCourseBodySchema) {
    const isBodyValidated = createUserCourseBodySchema.safeParse(body);
    const { courseId, userId } = createUserCourseBodySchema.parse(body);

    if (!isBodyValidated) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    if (!courseId) {
      throw new ConflictException("courseId is required.");
    }

    if (!userId) {
      throw new ConflictException("userId is required.");
    }

    const createdUserCourse = await this.createUserCourseUseCase.execute({
      userId,
      courseId,
    });

    return createdUserCourse;
  }
}
