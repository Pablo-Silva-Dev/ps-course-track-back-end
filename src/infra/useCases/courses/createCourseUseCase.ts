import { Injectable } from "@nestjs/common";
import { ICreateCourseDTO } from "src/infra/dtos/CourseDTO";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";

@Injectable()
export class CreateCourseUseCase {
  constructor(private coursesRepository: CoursesRepository) {}
  async execute(data: ICreateCourseDTO) {
    const createdCourse = await this.coursesRepository.createCourse(data);
    return createdCourse;
  }
}
