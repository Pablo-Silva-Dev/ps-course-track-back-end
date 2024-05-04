import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const getCourseBodySchema = z.object({
  courseId: z.string(),
});

type GetCourseBodySchema = z.infer<typeof getCourseBodySchema>;

@Controller("/courses/getUnique")
@UseGuards(AuthGuard("jwt"))
export class GetCourseController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle(@Body() body: GetCourseBodySchema) {
    const { courseId } = body;

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        classes: true,
        modules: true,
      },
    });

    if (!course) {
      throw new ConflictException("No course found for the provided courseId");
    }

    return course;
  }
}
