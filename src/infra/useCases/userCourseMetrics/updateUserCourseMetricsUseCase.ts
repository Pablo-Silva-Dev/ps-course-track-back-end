import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { UserCourseMetrics } from "../../entities/UserCourseMetrics";
import { UserCourseMetricsRepository } from "../../repositories/implementations/userCourseMetricsRepository";

@Injectable()
export class UpdateUserCourseMetricsUseCase {
  constructor(
    private userCourseMetricsRepository: UserCourseMetricsRepository,
    private usersRepository: UsersRepository,
    private coursesRepository: CoursesRepository
  ) {}
  async execute(data: UserCourseMetrics) {
    const { userId, courseId } = data;
    const user = await this.usersRepository.getUserById(userId);
    const course = await this.coursesRepository.getCourseById(courseId);

    const metrics = await this.userCourseMetricsRepository.get(
      userId,
      courseId
    );

    if (!metrics) {
      throw new ConflictException(
        "Not found metrics for this provided user related to the provided course"
      );
    }

    if (!user) {
      throw new NotFoundException("Not found an user for the provided userId");
    }

    if (!course) {
      throw new NotFoundException(
        "Not found a course for the provided courseId"
      );
    }

    const updatedMetrics = await this.userCourseMetricsRepository.update(data);

    return updatedMetrics;
  }
}
