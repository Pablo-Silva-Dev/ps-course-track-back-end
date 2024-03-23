import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const getClassBodySchema = z.object({
  classId: z.string(),
});

type GetClassBodySchema = z.infer<typeof getClassBodySchema>;

@Controller("/classes/getUnique")
export class GetClassController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle(@Body() body: GetClassBodySchema) {
    const { classId } = body;

    if (!classId) {
      throw new ConflictException("classId is required");
    }

    const classData = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    if (!classData) {
      throw new ConflictException("No class found for the provided classId");
    }

    return classData;
  }
}
