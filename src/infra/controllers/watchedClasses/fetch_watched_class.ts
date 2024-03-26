import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const fetchClassBodySchema = z.object({
  userId: z.string(),
  classId: z.string(),
});

type FetchClassBodySchema = z.infer<typeof fetchClassBodySchema>;

@Controller("watched-classes/fetch")
export class FetchClassController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: FetchClassBodySchema) {
    const { classId, userId } = fetchClassBodySchema.parse(body);

    const watchedClass = await this.prisma.userWatchedClasses.findUnique({
      where: {
        userId_classId: {
          userId,
          classId,
        },
      },
    });

    if (!watchedClass) {
      return {
        classWatched: false,
      };
    }
    return {
      classWatched: true,
      ...watchedClass,
    };
  }
}
