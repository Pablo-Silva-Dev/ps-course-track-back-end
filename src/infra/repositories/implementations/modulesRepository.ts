import { Injectable } from "@nestjs/common";
import { Module } from "src/infra/entities/Module";
import { PrismaService } from "src/infra/services/prismaService";
import { IModulesRepository } from "../interfaces/modulesRepository";

@Injectable()
export class ModulesRepository implements IModulesRepository {
  constructor(private prisma: PrismaService) {}
  async createModule({
    name,
    courseId,
    description,
    duration,
    cover_url,
  }: Module): Promise<Module> {
    const moduleAlreadyExists = await this.prisma.module.findUnique({
      where: {
        name,
      },
    });
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (course) {
      if (!moduleAlreadyExists) {
        const createdModule = await this.prisma.module.create({
          data: {
            name,
            cover_url,
            courseId,
            description,
            duration,
          },
        });
        return createdModule;
      }
    }
  }
  async listModules(courseId: string): Promise<Module[]> {
    const modules = await this.prisma.module.findMany({
      where: {
        courseId,
      },
    });
    return modules;
  }
  async getModuleById(moduleId: string): Promise<void | Module> {
    throw new Error("Method not implemented.");
  }
  async getModuleByName(moduleName: string): Promise<void | Module> {
    const module = await this.prisma.module.findUnique({
      where: {
        name: moduleName,
      },
    });
    if (module) {
      return module;
    }
  }
  async updateModule(
    moduleId: string,
    { description, cover_url }: Module
  ): Promise<void | Module> {
    throw new Error("Method not implemented.");
  }
  async deleteModule(moduleId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
