import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const createClassBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  duration: z.number(),
  moduleId: z.string(),
  tutorId: z.string(),
  courseId: z.string(),
});

type CreateClassBodySchema = z.infer<typeof createClassBodySchema>;

@Controller("/classes")
export class CreateClassController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateClassBodySchema) {
    const { name, description, url, duration, moduleId, tutorId, courseId } =
      createClassBodySchema.parse(body);

    const classAlreadyExists = await this.prisma.class.findUnique({
      where: {
        name,
      },
    });

    const module = await this.prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    const tutor = await this.prisma.tutor.findUnique({
      where: {
        id: tutorId,
      },
    });

    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!module) {
      throw new ConflictException("Module not found");
    }

    if (!tutor) {
      throw new ConflictException("Tutor not found");
    }

    if (!course) {
      throw new ConflictException("Course not found");
    }

    if (classAlreadyExists) {
      throw new ConflictException("Already exists a class with provided name");
    }

    await this.prisma.class.create({
      data: {
        name,
        description,
        url,
        duration,
        moduleId,
        tutorId,
        courseId
      },
    });
  }
}
