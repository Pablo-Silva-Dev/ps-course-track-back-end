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

const updateClassBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  url: z.string(),
  moduleId: z.string(),
  tutorId: z.string(),
  courseId: z.string(),
});

type UpdateClassBodySchema = z.infer<typeof updateClassBodySchema>;

@Controller("/classes")
export class UpdateClassController {
  constructor(private prisma: PrismaService) {}
  @Put(":classId")
  @HttpCode(203)
  async handle(
    @Param("classId") classId: string,
    @Body() body: UpdateClassBodySchema
  ) {
    const { url, description, duration, name, moduleId, courseId, tutorId } =
      body;

    if (!classId) {
      throw new ConflictException("classId is required");
    }

    const module = await this.prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    const tutor = await this.prisma.tutor.findUnique({
      where: {
        id: tutorId,
      },
    });

    if (!module) {
      throw new ConflictException("Module not found");
    }

    if (!course) {
      throw new ConflictException("Course not found");
    }

    if (!tutor) {
      throw new ConflictException("Tutor not found");
    }

    const classAlreadyExists = await this.prisma.class.findUnique({
      where: {
        name,
      },
    });

    if (classAlreadyExists) {
      throw new ConflictException(
        "There is already a class with the provided name. Please try another one."
      );
    }

    if (
      !name ||
      !url ||
      !description ||
      !duration ||
      !tutorId ||
      !moduleId ||
      !courseId
    ) {
      throw new ConflictException(
        "'name', 'url', 'description', 'tutorId', 'courseId', 'moduleId', and 'duration' are required fields"
      );
    }

    await this.prisma.class.update({
      where: {
        id: classId,
      },
      data: {
        name,
        description,
        duration,
        url,
        courseId,
        tutorId,
        moduleId
      },
    });
  }
}
