import { Injectable, NotFoundException } from "@nestjs/common";
import { Module } from "src/infra/entities/Module";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";
import { ModulesRepository } from "src/infra/repositories/implementations/modulesRepository";

@Injectable()
export class CreateModuleUseCase {
  constructor(
    private modulesRepository: ModulesRepository,
    private coursesRepository: CoursesRepository
  ) {}
  async execute({ name, courseId, description, duration, cover_url }: Module) {
    const course = await this.coursesRepository.getCourseById(courseId);

    if (!course) {
      throw new NotFoundException(
        "Not found a course for the provied courseId"
      );
    }

    const createdModule = await this.modulesRepository.createModule({
      name,
      courseId,
      description,
      duration,
      cover_url,
    });
    return createdModule;
  }
}
