import { Injectable, NotFoundException } from "@nestjs/common";
import { ICreateClassDTO } from "src/infra/dtos/ClassDTO";
import { ClassesRepository } from "src/infra/repositories/implementations/classesRepository";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";
import { ModulesRepository } from "src/infra/repositories/implementations/modulesRepository";
import { TutorsRepository } from "src/infra/repositories/implementations/tutorsRepository";

@Injectable()
export class CreateClassUseCase {
  constructor(
    private classesRepository: ClassesRepository,
    private modulesRepository: ModulesRepository,
    private coursesRepository: CoursesRepository,
    private tutorsRepository: TutorsRepository
  ) {}
  async execute(data: ICreateClassDTO) {
    const { moduleId, courseId, tutorId } = data;

    const module = await this.modulesRepository.getModuleById(moduleId);
    const course = await this.coursesRepository.getCourseById(courseId);
    const tutor = await this.tutorsRepository.getTutorById(tutorId);

    if (!module) {
      throw new NotFoundException(
        "Not found a module for the provided moduleId"
      );
    }

    if (!course) {
      throw new NotFoundException(
        "Not found a course for the provided courseId"
      );
    }

    if (!tutor) {
      throw new NotFoundException("Not found a tutor for the provided tutorId");
    }

    const createdClass = await this.classesRepository.createClass(data);
    return createdClass;
  }
}
