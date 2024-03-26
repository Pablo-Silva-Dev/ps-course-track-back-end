import {
  Body,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const unwatchClassBodySchema = z.object({
  userId: z.string(),
  classId: z.string(),
});

type UnwatchClassBodySchema = z.infer<typeof unwatchClassBodySchema>;

@Controller("watched-classes")
export class UnwatchClassesController {
  constructor(private prisma: PrismaService) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: UnwatchClassBodySchema) {
    const { classId, userId } = unwatchClassBodySchema.parse(body);

    const watchedClass = await this.prisma.userWatchedClasses.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });

    if (!watchedClass) {
      throw new NotFoundException("Watched class not found");
    }

    await this.prisma.userWatchedClasses.delete({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });
  }
}
