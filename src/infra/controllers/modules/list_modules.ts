import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
} from "@nestjs/common";
import { PrismaService } from "src/infra/services/prismaService";
import { z } from "zod";

const listModulesBodySchema = z.object({
  courseId: z.string(),
});

type ListModulesBodySchema = z.infer<typeof listModulesBodySchema>;

@Controller("/modules")
export class ListModulesController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle(@Body() body: ListModulesBodySchema) {
    const { courseId } = body;

    const courseExists = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    const modules = await this.prisma.module.findMany({
      where: {
        courseId,
      },
      include: {
        classes: true,
      },
    });

    if (!courseExists) {
      throw new ConflictException("Course not found");
    }

    return modules;
  }
}
