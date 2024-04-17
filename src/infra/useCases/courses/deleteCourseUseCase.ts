import { Injectable, NotFoundException } from "@nestjs/common";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";

@Injectable()
export class DeleteCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}
  async execute(courseId: string) {
    const course = await this.coursesRepository.getCourseById(courseId);
    if (!course) {
      throw new NotFoundException(
        "Not found a course for the provided courseId"
      );
    }
    await this.coursesRepository.deleteCourse(courseId);
  }
}
