import { Controller, Get, HttpCode } from "@nestjs/common";
import { PrismaService } from "src/infra/services/prismaService";

@Controller("/classes")
export class ListClassesController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const classes = await this.prisma.class.findMany({
      include: {
        commentaries: true
      }
    });
    return classes;
  }
}
