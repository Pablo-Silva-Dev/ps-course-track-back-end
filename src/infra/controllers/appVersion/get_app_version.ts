import { Controller, Get, HttpCode } from "@nestjs/common";
import { PrismaService } from "../../services/prismaService";

@Controller("/appVersion")
export class GetAppVersionController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const appVersion = await this.prisma.appVersion.findFirst();
    return appVersion;
  }
}
