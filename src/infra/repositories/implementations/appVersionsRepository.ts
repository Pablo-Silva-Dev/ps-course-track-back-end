import { Injectable } from "@nestjs/common";
import { AppVersion } from "src/infra/entities/AppVersion";
import { PrismaService } from "src/infra/services/prismaService";
import { IAppVersionRepository } from "../interfaces/appVersionsRepository";

@Injectable()
export class AppVersionsRepository implements IAppVersionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: AppVersion): Promise<void | AppVersion> {
    const { appVersion } = data;

    const appVersionAlreadyExists = await this.prisma.appVersion.findFirst({
      where: {
        appVersion,
      },
    });

    if (!appVersionAlreadyExists) {
      const createdVersion = await this.prisma.appVersion.create({
        data,
      });
      return createdVersion;
    }
  }

  async getUnique(appVersionName: string): Promise<void | AppVersion> {
    const appVersion = await this.prisma.appVersion.findFirst({
      where: {
        appVersion: appVersionName,
      },
    });
    return appVersion;
  }

  async list(): Promise<AppVersion[]> {
    const versions = await this.prisma.appVersion.findMany();
    return versions;
  }

  async update(
    appVersionId: string,
    data: AppVersion
  ): Promise<void | AppVersion> {
    const { id } = data;

    const appVersion = await this.prisma.appVersion.findUnique({
      where: {
        id: appVersionId,
      },
    });

    if (appVersion) {
      const updatedAppVersion = await this.prisma.appVersion.update({
        where: {
          id,
        },
        data,
      });
      return updatedAppVersion;
    }
  }
}
