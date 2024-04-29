import { UserCourseMetrics } from "../../entities/UserCourseMetrics";

export interface IUserCourseMetricsRepository {
  create(data: UserCourseMetrics): Promise<UserCourseMetrics | void>;
  get(userId: string, courseId: string): Promise<UserCourseMetrics>;
  getUserCourseMetricsById(metricsId: string): Promise<UserCourseMetrics>;
  update(metricsId: string): Promise<UserCourseMetrics | void>;
}
