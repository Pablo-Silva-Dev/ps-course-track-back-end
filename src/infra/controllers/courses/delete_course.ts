import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const deleteCourseBodySchema = z.object({
  courseId: z.string(),
});

type DeleteCourseBodySchema = z.infer<typeof deleteCourseBodySchema>;

@Controller("/courses")
export class DeleteCourseController {
  constructor(private prisma: PrismaService) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: DeleteCourseBodySchema) {
    const { courseId } = body;

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw new ConflictException("No found a course with the specified id");
    }

    await this.prisma.course.delete({
      where: {
        id: courseId,
      },
    });
  }
}
