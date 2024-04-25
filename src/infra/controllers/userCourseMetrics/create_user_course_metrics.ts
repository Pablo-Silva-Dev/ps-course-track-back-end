import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { CreateUserCourseMetricsUseCase } from "src/infra/useCases/userCourseMetrics/createUserCourseMetricsUseCase";
import { z } from "zod";

const createUserMetricsBodySchema = z.object({
  userId: z.string().optional(),
  courseId: z.string().optional(),
  courseTotalClasses: z.number().optional(),
  totalWatchedClasses: z.number().optional(),
  totalWatchedClassesPercentage: z.number().optional(),
});

type CreateUserMetricsBodySchema = z.infer<typeof createUserMetricsBodySchema>;

@Controller("/user-course-metrics")
export class CreateUserCourseMetricsController {
  constructor(
    private createUserCourseMetricsUseCase: CreateUserCourseMetricsUseCase
  ) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateUserMetricsBodySchema) {
    const {
      userId,
      courseId
    } = createUserMetricsBodySchema.parse(body);

    if (!userId) {
      throw new ConflictException("userId is required");
    }

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    const createdUserCourseMetrics =
      await this.createUserCourseMetricsUseCase.execute({
        userId,
        courseId
      });

    return createdUserCourseMetrics;
  }
}
