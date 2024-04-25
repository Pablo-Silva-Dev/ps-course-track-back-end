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
    const { userId, courseId } =
      userCourseMetricsBodySchema.parse(body);

    if (!userId) {
      throw new ConflictException("userId is required");
    }

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    const updatedUserCourseMetrics =
      await this.UpdateUserCourseMetricsUseCase.execute({
        userId,
        courseId,
      });

    return updatedUserCourseMetrics;
  }
}
