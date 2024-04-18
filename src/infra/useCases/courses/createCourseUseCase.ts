import { Injectable } from "@nestjs/common";
import { Course } from "src/infra/entities/Course";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";

@Injectable()
export class CreateCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}
  async execute(data: Course) {
    const createdCourse = await this.coursesRepository.createCourse(data);
    return createdCourse;
  }
}
