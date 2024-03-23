import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const createCourseBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  cover_url: z.string(),
});

type CreateCourseBodySchema = z.infer<typeof createCourseBodySchema>;

@Controller("/courses")
export class CreateCourseController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateCourseBodySchema) {
    const { name, cover_url, description, duration } =
      createCourseBodySchema.parse(body);

    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: {
        name,
      },
    });

    if (courseAlreadyExists) {
      throw new ConflictException("Already exists a course with this name.");
    }

    await this.prisma.course.create({
      data: {
        name,
        cover_url,
        description,
        duration,
      },
    });
  }
}
