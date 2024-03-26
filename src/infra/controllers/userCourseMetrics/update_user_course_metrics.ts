import { Body, Controller, HttpCode, Put } from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const userCourseMetricsBodySchema = z.object({
  userId: z.string(),
  courseId: z.string(),
  courseTotalClasses: z.number(),
  totalWatchedClasses: z.number(),
  totalWatchedClassesPercentage: z.number(),
});

type UserCourseMetricsBodySchema = z.infer<typeof userCourseMetricsBodySchema>;

@Controller("/user-course-metrics")
export class UpdateUserCourseMetricsController {
  constructor(private prisma: PrismaService) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: UserCourseMetricsBodySchema) {
    const {
      userId,
      courseId,
      courseTotalClasses,
      totalWatchedClasses,
      totalWatchedClassesPercentage,
    } = userCourseMetricsBodySchema.parse(body);

    await this.prisma.userMetrics.update({
      where: {
        courseId,
        userId,
      },
      data: {
        courseTotalClasses,
        totalWatchedClasses,
        totalWatchedClassesPercentage,
      },
    });
  }
}
