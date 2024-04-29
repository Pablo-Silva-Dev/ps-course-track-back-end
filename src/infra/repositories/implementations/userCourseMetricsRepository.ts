import { Injectable } from "@nestjs/common";
import { ICreateUserCourseMetricsDTO } from "src/infra/dtos/UserCourseMetricsDTO";
import { UserCourseMetrics } from "src/infra/entities/UserCourseMetrics";
import { PrismaService } from "src/infra/services/prismaService";
import { IUserCourseMetricsRepository } from "../interfaces/userCourseMetricsRepository";

@Injectable()
export class UserCourseMetricsRepository
  implements IUserCourseMetricsRepository
{
  constructor(private prisma: PrismaService) {}
  async create(
    data: ICreateUserCourseMetricsDTO
  ): Promise<UserCourseMetrics | void> {
    const { userId, courseId } = data;

    const metrics = await this.prisma.userMetrics.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    const totalCourseClasses = await this.prisma.class.count({
      where: {
        courseId,
      },
    });

    const totalClassesWatched = await this.prisma.userWatchedClasses.count();

    const coursePercentage =
      Number(totalClassesWatched / totalCourseClasses) * 100;

    if (!metrics) {
      const createdMetrics = await this.prisma.userMetrics.create({
        data: {
          userId,
          courseId,
          courseTotalClasses: totalCourseClasses,
          totalWatchedClasses: totalClassesWatched,
          totalWatchedClassesPercentage: coursePercentage,
        },
      });
      return createdMetrics;
    }
  }
  async get(userId: string, courseId: string): Promise<UserCourseMetrics> {
    const userCourseMetrics = await this.prisma.userMetrics.findFirst({
      where: {
        userId,
        courseId,
      },
    });
    return userCourseMetrics;
  }
  async getUserCourseMetricsById(
    metricsId: string
  ): Promise<UserCourseMetrics> {
    const userCourseMetrics = await this.prisma.userMetrics.findUnique({
      where: {
        id: metricsId,
      },
    });
    return userCourseMetrics;
  }

  async update(metricsId: string): Promise<UserCourseMetrics | void> {
    const userCourseMetrics = await this.prisma.userMetrics.findUnique({
      where: {
        id: metricsId,
      },
    });

    const totalCourseClasses = await this.prisma.class.count({
      where: {
        courseId: userCourseMetrics.courseId,
      },
    });

    const totalClassesWatched = await this.prisma.userWatchedClasses.count();

    const coursePercentage =
      Number(totalClassesWatched / totalCourseClasses) * 100;

    if (userCourseMetrics) {
      const updatedUserCourseMetrics = await this.prisma.userMetrics.update({
        where: {
          id: metricsId,
        },
        data: {
          courseTotalClasses: totalCourseClasses,
          totalWatchedClasses: totalClassesWatched,
          totalWatchedClassesPercentage: coursePercentage,
        },
      });
      return updatedUserCourseMetrics;
    }
  }
}
