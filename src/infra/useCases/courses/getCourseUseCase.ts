import { Injectable } from "@nestjs/common";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";

@Injectable()
export class GetCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}
  async execute(courseId: string) {
    const course = await this.coursesRepository.getCourseById(courseId);
    return course;
  }
}
