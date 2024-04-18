import { Injectable, NotFoundException } from "@nestjs/common";
import { ModulesRepository } from "src/infra/repositories/implementations/modulesRepository";

@Injectable()
export class DeleteModuleUseCase {
  constructor(private modulesRepository: ModulesRepository) {}
  async execute(moduleId: string) {
    const module = await this.modulesRepository.getModuleById(moduleId);
    if (!module) {
      throw new NotFoundException(
        "Not found a module for the provided moduleId"
      );
    }
    await this.modulesRepository.deleteModule(moduleId);
  }
}
