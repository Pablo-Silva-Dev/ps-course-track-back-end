import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const updateCourseBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().optional(),
  cover_url: z.string().optional(),
});

type UpdateCourseBodySchema = z.infer<typeof updateCourseBodySchema>;

@Controller("/courses")
export class UpdateCourseController {
  constructor(private prisma: PrismaService) {}
  @Put(":courseId")
  @HttpCode(203)
  async handle(
    @Param("courseId") courseId: string,
    @Body() body: UpdateCourseBodySchema
  ) {
    const { cover_url, description, duration, name } = body;

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new ConflictException("Course not found");
    }

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        name,
      },
    });

    if (courseAlreadyExists) {
      throw new ConflictException(
        "There is already a course with the provided name. Please try another one."
      );
    }

    if (!name || !cover_url || !description || !duration) {
      throw new ConflictException(
        "'name', 'cover_url', 'description', and 'duration' are required fields"
      );
    }

    await this.prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        name,
        description,
        duration,
        cover_url,
      },
    });
  }
}
