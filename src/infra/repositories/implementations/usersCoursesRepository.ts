import { Injectable } from "@nestjs/common";
import { ICreateUserCourseDTO } from "src/infra/dtos/UserCourseDTO";
import { PrismaService } from "src/infra/services/prismaService";
import { IUsersCoursesRepository } from "../interfaces/usersCoursesRepository";

@Injectable()
export class UsersCoursesRepository implements IUsersCoursesRepository {
  constructor(private prismaService: PrismaService) {}
  async checkRecordAlreadyExists(data: ICreateUserCourseDTO): Promise<boolean> {
    const { courseId, userId } = data;
    const recordAlreadyExists = await this.prismaService.userCourse.findFirst({
      where: {
        userId,
        courseId,
      },
    });
    if (recordAlreadyExists) {
      return true;
    }
    return false;
  }
  async create(data: ICreateUserCourseDTO): Promise<ICreateUserCourseDTO> {
    const { courseId, userId } = data;
    if (userId && courseId) {
      const recordAlreadyExists = await this.prismaService.userCourse.findFirst(
        {
          where: {
            userId,
            courseId,
          },
        }
      );
      if (!recordAlreadyExists) {
        const createdUserCourse = await this.prismaService.userCourse.create({
          data: {
            userId,
            courseId,
          },
        });
        return createdUserCourse;
      }
    }
  }
  async list(): Promise<ICreateUserCourseDTO[]> {
    const usersCourses = await this.prismaService.userCourse.findMany({
      include: {
        course: true,
      },
    });
    return usersCourses;
  }
  async listByUser(userId: string): Promise<ICreateUserCourseDTO[]> {
    const usersCourses = await this.prismaService.userCourse.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
    });
    return usersCourses;
  }
}
