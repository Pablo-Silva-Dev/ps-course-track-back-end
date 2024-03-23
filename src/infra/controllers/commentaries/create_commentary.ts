import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const createCommentaryBodySchema = z.object({
  content: z.string(),
  userId: z.string(),
  classId: z.string(),
  courseId: z.string(),
});

type CreateCommentaryBodySchema = z.infer<typeof createCommentaryBodySchema>;

@Controller("/commentaries")
export class CreateCommentaryController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateCommentaryBodySchema) {
    const { content, classId, userId, courseId } =
      createCommentaryBodySchema.parse(body);

    const courseExists = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    const classExists = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    const userExists = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!courseExists) {
      throw new NotFoundException("Course not found.");
    }

    if (!classExists) {
      throw new NotFoundException("Class not found.");
    }

    if (!userExists) {
      throw new NotFoundException("User not found.");
    }

    await this.prisma.commentary.create({
      data: {
        content,
        classId,
        userId,
        courseId,
      },
    });
  }
}
