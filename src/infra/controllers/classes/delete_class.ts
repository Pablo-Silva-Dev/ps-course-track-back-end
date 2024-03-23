import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const deleteClassBodySchema = z.object({
  classId: z.string(),
});

type DeleteClassBodySchema = z.infer<typeof deleteClassBodySchema>;

@Controller("/classes")
export class DeleteClassController {
  constructor(private prisma: PrismaService) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: DeleteClassBodySchema) {
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
      throw new ConflictException("No found a class with the specified id");
    }

    await this.prisma.class.delete({
      where: {
        id: classId,
      },
    });
  }
}
