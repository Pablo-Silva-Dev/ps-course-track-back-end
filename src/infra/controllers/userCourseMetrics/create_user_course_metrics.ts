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

//  to correctly handle this use case, perform COUNT over class.length associated with the course and COUNT the total of records on UserWatchedClasses model.

// check if is possible to calculate the percentage value of watched classes and return it

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
      courseId,
      courseTotalClasses,
      totalWatchedClasses,
      totalWatchedClassesPercentage,
    } = createUserMetricsBodySchema.parse(body);

    if (!userId) {
      throw new ConflictException("userId is required");
    }

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    if (!courseTotalClasses) {
      throw new ConflictException("courseTotalClasses is required");
    }

    if (!totalWatchedClasses) {
      throw new ConflictException("totalWatchedClasses is required");
    }

    if (!totalWatchedClassesPercentage) {
      throw new ConflictException("totalWatchedClassesPercentage is required");
    }

    const createdUserCourseMetrics =
      await this.createUserCourseMetricsUseCase.execute({
        userId,
        courseId,
        courseTotalClasses,
        totalWatchedClasses,
        totalWatchedClassesPercentage,
      });

    return createdUserCourseMetrics;
  }
}
