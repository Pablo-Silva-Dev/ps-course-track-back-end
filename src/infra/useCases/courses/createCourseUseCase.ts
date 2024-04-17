import { ConflictException, Injectable } from "@nestjs/common";
import { Course } from "src/infra/entities/Course";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";

@Injectable()
export class CreateCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}
  async execute(data: Course) {
    const { name } = data;
    const courseAlreadyExists =
      await this.coursesRepository.getCourseByName(name);
    if (courseAlreadyExists) {
      throw new ConflictException("Course already exists");
    }

    const createdCourse = await this.coursesRepository.createCourse(data);
    return createdCourse;
  }
}
