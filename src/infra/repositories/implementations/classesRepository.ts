import { Injectable } from "@nestjs/common";
import { Class } from "src/infra/entities/Class";
import { PrismaService } from "../../services/prismaService";
import { IClassesRepository } from "../interfaces/classesRepository";

@Injectable()
export class ClassesRepository implements IClassesRepository {
  constructor(private prisma: PrismaService) {}
  async createClass(data: Class): Promise<Class> {
    const { name, duration, description, courseId, url, moduleId, tutorId } =
      data;

    const classAlreadyExists = await this.prisma.class.findUnique({
      where: {
        name,
      },
    });

    const tutor = await this.prisma.tutor.findUnique({
      where: {
        id: tutorId,
      },
    });

    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    const module = await this.prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (!classAlreadyExists) {
      if (module && course && tutor) {
        const createdClass = await this.prisma.class.create({
          data: {
            name,
            duration,
            description,
            url,
            courseId,
            moduleId,
            tutorId,
          },
        });
        return createdClass;
      }
    }
  }
  async listClasses(): Promise<Class[]> {
    const classes = await this.prisma.class.findMany();
    return classes;
  }
  async listClassesByModule(moduleId: string): Promise<Class[]> {
    const classes = await this.prisma.class.findMany({
      where: {
        moduleId,
      },
    });
    return classes;
  }
  async getClassById(courseId: string): Promise<void | Class> {
    throw new Error("Method not implemented.");
  }
  async updateClass(
    courseId: string,
    { description, name }: Class
  ): Promise<void | Class> {
    throw new Error("Method not implemented.");
  }
  async deleteClass(courseId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
