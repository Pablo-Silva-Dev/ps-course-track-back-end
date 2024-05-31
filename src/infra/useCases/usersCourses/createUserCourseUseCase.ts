import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { ICreateUserCourseDTO } from "src/infra/dtos/UserCourseDTO";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { UsersCoursesRepository } from "../../repositories/implementations/usersCoursesRepository";

@Injectable()
export class CreateUserCourseUseCase {
  constructor(
    private usersCoursesRepository: UsersCoursesRepository,
    private usersRepository: UsersRepository,
    private coursesRepository: CoursesRepository
  ) {}
  async execute(data: ICreateUserCourseDTO) {
    const { courseId, userId } = data;

    const course = await this.coursesRepository.getCourseById(courseId);
    const user = await this.usersRepository.getUserById(userId);

    if (!course) {
      throw new NotFoundException(
        "Not found a course for the provided courseId"
      );
    }

    if (!user) {
      throw new NotFoundException("Not found a user for the provided userId");
    }

    const userCourseAlreadyExists =
      await this.usersCoursesRepository.checkRecordAlreadyExists(data);

    if (userCourseAlreadyExists) {
      throw new ConflictException("This record already exists");
    }

    const createdUserCourse = await this.usersCoursesRepository.create(data);
    return createdUserCourse;
  }
}
