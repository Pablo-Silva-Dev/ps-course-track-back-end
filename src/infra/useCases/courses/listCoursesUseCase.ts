import { Injectable } from "@nestjs/common";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";

@Injectable()
export class ListCoursesUseCase {
  constructor(private coursesRepository: CoursesRepository) {}
  async execute() {
    const courses = await this.coursesRepository.listCourses();
    return courses;
  }
}
