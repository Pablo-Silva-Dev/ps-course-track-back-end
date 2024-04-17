import { Injectable } from "@nestjs/common";
import { Course } from "src/infra/entities/Course";
import { PrismaService } from "src/infra/services/prismaService";
import { ICoursesRepository } from "../interfaces/coursesRepository";

@Injectable()
export class CoursesRepository implements ICoursesRepository {
  constructor(private prisma: PrismaService) {}
  async createCourse(data: Course): Promise<Course> {
    const { cover_url, description, duration, name } = data;

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        name,
      },
    });

    if (!courseAlreadyExists) {
      const createdCourse = await this.prisma.course.create({
        data: {
          name,
          cover_url,
          description,
          duration,
        },
      });
      return createdCourse;
    }
  }
  async listCourses(): Promise<Course[]> {
    const courses = await this.prisma.course.findMany();
    return courses;
  }
  async getCourseById(courseId: string): Promise<void | Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (course) {
      return course;
    }
  }

  async getCourseByName(courseName: string): Promise<void | Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        name: courseName,
      },
    });
    if (course) {
      return course;
    }
  }

  async updateCourse(
    courseId: string,
    { description, cover_url, name }: Course
  ): Promise<void | Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (course) {
      const updatedCourse = await this.prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          description,
          cover_url,
          name,
        },
      });
      return updatedCourse;
    }
  }

  async deleteCourse(courseId: string): Promise<void> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (course) {
      await this.prisma.course.delete({
        where: {
          id: courseId,
        },
      });
    }
  }
}
