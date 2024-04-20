import { Injectable, NotFoundException } from "@nestjs/common";
import { ModulesRepository } from "src/infra/repositories/implementations/modulesRepository";
import { ClassesRepository } from "../../repositories/implementations/classesRepository";

@Injectable()
export class ListClassesByModuleUseCase {
  constructor(
    private classesRepository: ClassesRepository,
    private modulesRepository: ModulesRepository
  ) {}
  async execute(moduleId: string) {
    const module = await this.modulesRepository.getModuleById(moduleId);
    if (!module) {
      throw new NotFoundException(
        "Not found a module for the provided moduleId"
      );
    }
    const classes = await this.classesRepository.listClassesByModule(moduleId);
    return classes;
  }
}
