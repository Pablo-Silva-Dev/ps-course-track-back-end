import { Injectable } from "@nestjs/common";
import { ModulesRepository } from "src/infra/repositories/implementations/modulesRepository";

@Injectable()
export class ListModulesUseCase {
  constructor(private modulesRepository: ModulesRepository) {}
  async execute(courseId: string) {
    const modules = await this.modulesRepository.listModules(courseId);
    return modules;
  }
}
