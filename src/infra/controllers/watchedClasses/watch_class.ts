import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const watchClassBodySchema = z.object({
  userId: z.string(),
  classId: z.string(),
});

type WatchClassBodySchema = z.infer<typeof watchClassBodySchema>;

@Controller("watched-classes")
export class WatchClassesController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: WatchClassBodySchema) {
    const { classId, userId } = watchClassBodySchema.parse(body);

    const watchedClass = await this.prisma.userWatchedClasses.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });

    if (watchedClass) {
      throw new ConflictException("Class was recorded as watched already.");
    }

    await this.prisma.userWatchedClasses.create({
      data: {
        classId,
        userId,
      },
    });
  }
}
