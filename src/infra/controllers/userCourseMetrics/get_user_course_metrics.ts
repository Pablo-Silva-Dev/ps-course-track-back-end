import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { GetUserCourseMetricsUseCase } from "src/infra/useCases/userCourseMetrics/getUserCourseMetricsUseCase";
import { z } from "zod";

const getUserCourseMetricsBodySchema = z.object({
  userId: z.string().optional(),
  courseId: z.string().optional(),
});

type GetUserCourseMetricsBodySchema = z.infer<
  typeof getUserCourseMetricsBodySchema
>;

@Controller("/user-course-metrics/get-unique")
export class GetUserCourseMetricsController {
  constructor(
    private getUserCourseMetricsUseCase: GetUserCourseMetricsUseCase
  ) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: GetUserCourseMetricsBodySchema) {
    const { userId, courseId } = getUserCourseMetricsBodySchema.parse(body);

    if (!userId || !courseId) {
      throw new ConflictException("userId and courseId are required fields");
    }

    const userCourseMetrics = await this.getUserCourseMetricsUseCase.execute(
      userId,
      courseId
    );

    return userCourseMetrics;
  }
}
