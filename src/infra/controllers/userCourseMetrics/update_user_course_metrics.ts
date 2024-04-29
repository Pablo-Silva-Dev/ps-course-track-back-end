import {
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { UpdateUserCourseMetricsUseCase } from "src/infra/useCases/userCourseMetrics/updateUserCourseMetricsUseCase";

@Controller("/user-course-metrics")
export class UpdateUserCourseMetricsController {
  constructor(
    private UpdateUserCourseMetricsUseCase: UpdateUserCourseMetricsUseCase
  ) {}
  @Put(":metricsId")
  @HttpCode(203)
  async handle(@Param("metricsId") metricsId: string) {
    if (!metricsId) {
      throw new ConflictException("metricsId is required");
    }
    const updatedUserCourseMetrics =
      await this.UpdateUserCourseMetricsUseCase.execute(metricsId);

    return updatedUserCourseMetrics;
  }
}
