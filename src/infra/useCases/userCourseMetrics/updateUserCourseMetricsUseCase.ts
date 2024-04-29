import { ConflictException, Injectable } from "@nestjs/common";
import { UserCourseMetricsRepository } from "../../repositories/implementations/userCourseMetricsRepository";

@Injectable()
export class UpdateUserCourseMetricsUseCase {
  constructor(
    private userCourseMetricsRepository: UserCourseMetricsRepository
  ) {}
  async execute(metricsId: string) {
    const metricsRecord =
      await this.userCourseMetricsRepository.getUserCourseMetricsById(
        metricsId
      );

    if (!metricsRecord) {
      throw new ConflictException(
        "Not found metrics for this provided metricsId"
      );
    }

    const updatedMetrics =
      await this.userCourseMetricsRepository.update(metricsId);

    return updatedMetrics;
  }
}
