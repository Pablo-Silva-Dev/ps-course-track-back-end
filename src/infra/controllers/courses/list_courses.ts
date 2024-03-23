import { Controller, Get, HttpCode } from "@nestjs/common";
import { PrismaService } from "src/infra/services/prismaService";

@Controller("/courses")
export class ListCoursesController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const courses = await this.prisma.course.findMany({
      include:{
        modules: true,
        classes: true,
      }
    });
    return courses;
  }
}
