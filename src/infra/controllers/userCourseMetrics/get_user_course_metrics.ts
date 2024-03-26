import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { PrismaService } from "src/infra/services/prismaService";
import { z } from "zod";

const getUserCourseMetricsBodySchema = z.object({
  userId: z.string(),
  courseId: z.string(),
});

type GetUserCourseMetricsBodySchema = z.infer<typeof getUserCourseMetricsBodySchema>;

@Controller("/user-course-metrics/get-unique")
export class GetUserCourseMetricsController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: GetUserCourseMetricsBodySchema) {
    const { userId, courseId } = getUserCourseMetricsBodySchema.parse(body);

    const courses = await this.prisma.userMetrics.findUnique({
      where: {
        userId,
        courseId,
      },
    });
    return courses;
  }
}
