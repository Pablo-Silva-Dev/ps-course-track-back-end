import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const createModuleBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  cover_url: z.string(),
  courseId: z.string(),
});

type CreateModuleBodySchema = z.infer<typeof createModuleBodySchema>;

@Controller("/modules")
export class CreateModuleController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateModuleBodySchema) {
    const { name, cover_url, description, duration, courseId } =
      createModuleBodySchema.parse(body);

    const moduleAlreadyExists = await this.prisma.module.findUnique({
      where: {
        name,
      },
    });

    const courseExists = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (moduleAlreadyExists) {
      throw new ConflictException("Already exists a module with this name.");
    }

    if (!courseExists) {
      throw new ConflictException("Course not found.");
    }

    await this.prisma.module.create({
      data: {
        name,
        cover_url,
        description,
        duration,
        courseId,
      },
    });
  }
}
