import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
} from "@nestjs/common";
import { UpdateUserCourseMetricsUseCase } from "src/infra/useCases/userCourseMetrics/updateUserCourseMetricsUseCase";
import { z } from "zod";

const userCourseMetricsBodySchema = z.object({
  userId: z.string().optional(),
  courseId: z.string().optional(),
  courseTotalClasses: z.number().optional(),
  totalWatchedClasses: z.number().optional(),
  totalWatchedClassesPercentage: z.number().optional(),
});

type UserCourseMetricsBodySchema = z.infer<typeof userCourseMetricsBodySchema>;

@Controller("/user-course-metrics")
export class UpdateUserCourseMetricsController {
  constructor(
    private UpdateUserCourseMetricsUseCase: UpdateUserCourseMetricsUseCase
  ) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: UserCourseMetricsBodySchema) {
    const {
      userId,
      courseId,
      courseTotalClasses,
      totalWatchedClasses,
      totalWatchedClassesPercentage,
    } = userCourseMetricsBodySchema.parse(body);

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

    const updatedUserCourseMetrics =
      await this.UpdateUserCourseMetricsUseCase.execute({
        userId,
        courseId,
        courseTotalClasses,
        totalWatchedClasses,
        totalWatchedClassesPercentage,
      });

    return updatedUserCourseMetrics;
  }
}
