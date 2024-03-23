import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const updateTutorBodySchema = z.object({
  name: z.string(),
  bio: z.string(),
});

type UpdateTutorBodySchema = z.infer<typeof updateTutorBodySchema>;

@Controller("/tutors")
export class UpdateTutorController {
  constructor(private prisma: PrismaService) {}
  @Put(":tutorId")
  @HttpCode(203)
  async handle(
    @Body() body: UpdateTutorBodySchema,
    @Param("tutorId") tutorId: string
  ) {
    const { name, bio } = body;

    if (!tutorId) {
      throw new ConflictException("tutorId is required");
    }

    const tutor = await this.prisma.tutor.findUnique({
      where: {
        id: tutorId,
      },
    });

    if (!tutor) {
      throw new ConflictException("Tutor not found");
    }

    const tutorAlreadyExists = await this.prisma.tutor.findUnique({
      where: {
        name,
      },
    });

    if (tutorAlreadyExists) {
      throw new ConflictException(
        "There is already a tutor with the provided name. Please try another one."
      );
    }

    await this.prisma.tutor.update({
      where: {
        id: tutorId,
      },
      data: {
        name,
        bio,
      },
    });
  }
}
