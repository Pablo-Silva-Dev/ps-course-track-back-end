import { Injectable } from "@nestjs/common";
import { UserWatchedClasses } from "src/infra/entities/UserWatchedClasses";
import { PrismaService } from "src/infra/services/prismaService";
import { IWatchedClassesRepository } from "../interfaces/watchedClassesRepository";

@Injectable()
export class WatchedClassesRepository implements IWatchedClassesRepository {
  constructor(private prisma: PrismaService) {}
  async watchClass(
    userId: string,
    classId: string
  ): Promise<UserWatchedClasses> {
    const watchedClass = await this.prisma.userWatchedClasses.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });

    if (!watchedClass) {
      const registerWatchedClass = await this.prisma.userWatchedClasses.create({
        data: {
          classId,
          userId,
        },
      });
      return registerWatchedClass;
    }
  }
  async fetchClass(
    userId: string,
    classId: string
  ): Promise<{ classWatched: boolean }> {
    const watchedClass = await this.prisma.userWatchedClasses.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });
    if (!watchedClass) {
      return {
        classWatched: false,
      };
    }
    return {
      classWatched: true,
      ...watchedClass,
    };
  }
  unwatchClass(userId: string, classId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
