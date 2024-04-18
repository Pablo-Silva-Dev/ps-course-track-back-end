import { Module } from "../../entities/Module";

export interface IModulesRepository {
  createModule({
    name,
    courseId,
    description,
    duration,
    cover_url,
  }: Module): Promise<Module>;
  listModules(courseId: string): Promise<Module[]>;
  getModuleById(moduleId: string): Promise<Module | void>;
  getModuleByName(moduleName: string): Promise<Module | void>;
  updateModule(
    moduleId: string,
    { description, cover_url }: Module
  ): Promise<Module | void>;
  deleteModule(moduleId: string): Promise<void>;
}
