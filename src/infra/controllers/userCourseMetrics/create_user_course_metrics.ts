import {
  Body,
  Controller,
  HttpCode,
  NotAcceptableException,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const createUserMetricsBodySchema = z.object({
  userId: z.string(),
  courseId: z.string(),
  courseTotalClasses: z.number(),
  totalWatchedClasses: z.number(),
  totalWatchedClassesPercentage: z.number(),
});

type CreateUserMetricsBodySchema = z.infer<typeof createUserMetricsBodySchema>;

@Controller("/user-course-metrics")
export class CreateUserCourseMetricsController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateUserMetricsBodySchema) {
    const {
      userId,
      courseId,
      courseTotalClasses,
      totalWatchedClasses,
      totalWatchedClassesPercentage,
    } = createUserMetricsBodySchema.parse(body);

    const metricsAlreadyExists = await this.prisma.userMetrics.findFirst({
      where: {
        courseId,
        userId,
      },
    });

    if (metricsAlreadyExists) {
      throw new NotAcceptableException(
        "Already exists metrics for this user linked to this course"
      );
    }

    await this.prisma.userMetrics.create({
      data: {
        userId,
        courseId,
        courseTotalClasses,
        totalWatchedClasses,
        totalWatchedClassesPercentage,
      },
    });
  }
}
