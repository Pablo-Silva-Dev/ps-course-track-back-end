import { Injectable, NotFoundException } from "@nestjs/common";
import { ModulesRepository } from "../../repositories/implementations/modulesRepository";

@Injectable()
export class GetModuleUseCase {
  constructor(private modulesRepository: ModulesRepository) {}
  async execute(moduleId: string) {
    const module = await this.modulesRepository.getModuleById(moduleId);
    if (!module) {
      throw new NotFoundException("No module found for the provided moduleId");
    }
    return module;
  }
}
