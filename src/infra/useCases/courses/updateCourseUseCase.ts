import { Injectable, NotFoundException } from "@nestjs/common";
import { IUpdateCourseDTO } from "src/infra/dtos/CourseDTO";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";

@Injectable()
export class UpdateCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}
  async execute(
    courseId: string,
    { cover_url, description, name }: IUpdateCourseDTO
  ) {
    const course = await this.coursesRepository.getCourseById(courseId);

    if (!course) {
      throw new NotFoundException(
        "Not found a course for the provided courseId"
      );
    }
    const updatedCourse = await this.coursesRepository.updateCourse(courseId, {
      description,
      cover_url,
      name,
    });
    return updatedCourse;
  }
}
