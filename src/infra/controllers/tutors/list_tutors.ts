import { Controller, Get, HttpCode } from "@nestjs/common";
import { PrismaService } from "src/infra/services/prismaService";

@Controller("/tutors")
export class ListTutorsController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const modules = await this.prisma.tutor.findMany({
      include:{
        classes: true
      }
    });

    return modules;
  }
}
