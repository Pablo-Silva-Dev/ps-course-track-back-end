import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const createTutorBodySchema = z.object({
  name: z.string(),
  bio: z.string(),
});

type CreateTutorBodySchema = z.infer<typeof createTutorBodySchema>;

@Controller("/tutors")
export class CreateTutorController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateTutorBodySchema) {
    const { name, bio } = createTutorBodySchema.parse(body);

    const tutorAlreadyExists = await this.prisma.tutor.findUnique({
      where: {
        name,
      },
    });

    if (tutorAlreadyExists) {
      throw new ConflictException("Already exists a tutor with this name.");
    }

    await this.prisma.tutor.create({
      data: {
        name,
        bio,
      },
    });
  }
}
