import { Injectable, NotFoundException } from "@nestjs/common";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { UserCourseMetricsRepository } from "../../repositories/implementations/userCourseMetricsRepository";

@Injectable()
export class GetUserCourseMetricsUseCase {
  constructor(
    private userCourseMetricsRepository: UserCourseMetricsRepository,
    private usersRepository: UsersRepository,
    private coursesRepository: CoursesRepository
  ) {}
  async execute(userId: string, courseId: string) {
    const user = await this.usersRepository.getUserById(userId);
    const course = await this.coursesRepository.getCourseById(courseId);

    if (!user) {
      throw new NotFoundException("Not found an user for the provided userId");
    }

    if (!course) {
      throw new NotFoundException(
        "Not found a course for the provided courseId"
      );
    }

    const createdMetrics = await this.userCourseMetricsRepository.get(
      userId,
      courseId
    );

    return createdMetrics;
  }
}
