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
export class CreateUserCourseMetricsUseCase {
  constructor(
    private userCourseMetricsRepository: UserCourseMetricsRepository,
    private usersRepository: UsersRepository,
    private coursesRepository: CoursesRepository
  ) {}
  async execute(data: UserCourseMetrics) {
    const { userId, courseId } = data;
    const user = await this.usersRepository.getUserById(userId);
    const course = await this.coursesRepository.getCourseById(courseId);

    const metricsAlreadyExists = await this.userCourseMetricsRepository.get(
      userId,
      courseId
    );

    if (metricsAlreadyExists) {
      throw new ConflictException(
        "Metrics already exists for this user related to the course"
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

    const createdMetrics = await this.userCourseMetricsRepository.create(data);

    return createdMetrics;
  }
}
