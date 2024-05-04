import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PrismaService } from "src/infra/services/prismaService";

@Controller("/courses")
@UseGuards(AuthGuard("jwt"))
export class ListCoursesController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const courses = await this.prisma.course.findMany({
      include: {
        modules: true,
        classes: true,
      },
    });
    return courses;
  }
}
