import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const deleteTutorBodySchema = z.object({
  tutorId: z.string(),
});

type DeleteTutorBodySchema = z.infer<typeof deleteTutorBodySchema>;

@Controller("/tutors")
export class DeleteTutorController {
  constructor(private prisma: PrismaService) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: DeleteTutorBodySchema) {
    const { tutorId } = body;

    if (!tutorId) {
      throw new ConflictException("tutorId is required");
    }

    const tutor = await this.prisma.tutor.findUnique({
      where: {
        id: tutorId,
      },
    });

    if (!tutor) {
      throw new ConflictException("No found a tutor with the specified id");
    }

    await this.prisma.tutor.delete({
      where: {
        id: tutorId,
      },
    });
  }
}
