import { Injectable } from "@nestjs/common";
import { Class } from "src/infra/entities/Class";
import { PrismaService } from "../../services/prismaService";
import { IClassesRepository } from "../interfaces/classesRepository";
import { ICreateClassDTO, IUpdateClassDTO } from "src/infra/dtos/ClassDTO";

@Injectable()
export class ClassesRepository implements IClassesRepository {
  constructor(private prisma: PrismaService) {}
  async createClass(data: ICreateClassDTO): Promise<Class> {
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
    const classes = await this.prisma.class.findMany({
      include: {
        commentaries: true,
      },
    });
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
  async getClassById(classId: string): Promise<void | Class> {
    const foundClass = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    if (foundClass) {
      return foundClass;
    }
  }
  async updateClass(
    classId: string,
    { description, name, url }: IUpdateClassDTO
  ): Promise<void | Class> {
    const foundClass = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
    });
    if (foundClass) {
      const updatedClass = await this.prisma.class.update({
        where: {
          id: classId,
        },
        data: {
          description,
          name,
          url,
        },
      });
      return updatedClass;
    }
  }
  async deleteClass(classId: string): Promise<void> {
    const foundClass = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    if (foundClass) {
      await this.prisma.class.delete({
        where: {
          id: classId,
        },
      });
    }
  }
}
