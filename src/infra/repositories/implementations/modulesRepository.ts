import { Injectable } from "@nestjs/common";
import { Module } from "src/infra/entities/Module";
import { PrismaService } from "src/infra/services/prismaService";
import { IModulesRepository } from "../interfaces/modulesRepository";
import { ICreateModuleDTO, IUpdateModuleDTO } from "src/infra/dtos/ModuleDTO";

@Injectable()
export class ModulesRepository implements IModulesRepository {
  constructor(private prisma: PrismaService) {}
  async createModule({
    name,
    courseId,
    description,
    duration,
    cover_url,
  }: ICreateModuleDTO): Promise<Module> {
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
    const module = await this.prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (module) {
      return module;
    }
  }
  async updateModule(
    moduleId: string,
    { description, cover_url, name, duration }: IUpdateModuleDTO
  ): Promise<void | Module> {
    const module = await this.prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (module) {
      const updatedModule = await this.prisma.module.update({
        where: {
          id: moduleId,
        },
        data: {
          description,
          cover_url,
          name,
          duration,
        },
      });
      return updatedModule;
    }
  }
  async deleteModule(moduleId: string): Promise<void> {
    const module = await this.prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (module) {
      await this.prisma.module.delete({
        where: {
          id: moduleId,
        },
      });
    }
  }
}
