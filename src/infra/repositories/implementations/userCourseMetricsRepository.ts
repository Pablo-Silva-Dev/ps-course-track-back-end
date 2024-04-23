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
      courseId,
      courseTotalClasses,
      totalWatchedClasses,
      totalWatchedClassesPercentage,
    } = data;

    const metrics = await this.prisma.userMetrics.findUnique({
      where: {
        userId,
        courseId,
      },
    });

    if (!metrics) {
      const createdMetrics = await this.prisma.userMetrics.create({
        data: {
          userId,
          courseId,
          courseTotalClasses,
          totalWatchedClasses,
          totalWatchedClassesPercentage,
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
    const {
      userId,
      courseId,
      courseTotalClasses,
      totalWatchedClasses,
      totalWatchedClassesPercentage,
    } = data;

    const userCourseMetrics = await this.prisma.userMetrics.findUnique({
      where: {
        userId,
        courseId,
      },
    });
    if (userCourseMetrics) {
    }
    const updatedUserCourseMetrics = await this.prisma.userMetrics.update({
      where: {
        courseId,
        userId,
      },
      data: {
        courseTotalClasses,
        totalWatchedClasses,
        totalWatchedClassesPercentage,
      },
    });
    return updatedUserCourseMetrics;
  }
}
