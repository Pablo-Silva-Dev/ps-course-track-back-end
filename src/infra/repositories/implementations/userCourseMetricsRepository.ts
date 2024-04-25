import { Injectable } from "@nestjs/common";
import { UserCourseMetrics } from "src/infra/entities/UserCourseMetrics";
import { PrismaService } from "src/infra/services/prismaService";
import { IUserCourseMetricsRepository } from "../interfaces/userCourseMetricsRepository";

@Injectable()
export class UserCourseMetricsRepository
  implements IUserCourseMetricsRepository
{
  constructor(private prisma: PrismaService) {}
  async create(data: UserCourseMetrics): Promise<UserCourseMetrics | void> {
    const {
      userId,
      courseId
    } = data;

    const metrics = await this.prisma.userMetrics.findUnique({
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
    const userCourseMetrics = await this.prisma.userMetrics.findUnique({
      where: {
        userId,
        courseId,
      },
    });
    return userCourseMetrics;
  }
  async update(data: UserCourseMetrics): Promise<UserCourseMetrics> {
    const { userId, courseId } = data;

    const userCourseMetrics = await this.prisma.userMetrics.findUnique({
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

    if (userCourseMetrics) {
      const updatedUserCourseMetrics = await this.prisma.userMetrics.update({
        where: {
          courseId,
          userId,
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
