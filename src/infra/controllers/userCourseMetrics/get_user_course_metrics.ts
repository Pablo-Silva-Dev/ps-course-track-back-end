import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
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
@UseGuards(AuthGuard("jwt"))
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
