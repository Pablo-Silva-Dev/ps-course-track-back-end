import { Injectable, NotFoundException } from "@nestjs/common";
import { Module } from "src/infra/entities/Module";
import { ModulesRepository } from "src/infra/repositories/implementations/modulesRepository";

@Injectable()
export class UpdateModuleUseCase {
  constructor(private modulesRepository: ModulesRepository) {}
  async execute(
    moduleId: string,
    { cover_url, description, name, duration }: Module
  ) {
    const module = await this.modulesRepository.getModuleById(moduleId);

    if (!module) {
      throw new NotFoundException(
        "Not found a module for the provided moduleId"
      );
    }

    const updatedModule = await this.modulesRepository.updateModule(moduleId, {
      description,
      cover_url,
      name,
      duration,
    });
    return updatedModule;
  }
}
