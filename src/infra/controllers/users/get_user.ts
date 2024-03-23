import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const getUserBodySchema = z.object({
  userId: z.string(),
});

type GetUserBodySchema = z.infer<typeof getUserBodySchema>;

@Controller("/users/getUnique")
export class GetUserController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle(@Body() body: GetUserBodySchema) {
    const { userId } = body;

    if (!userId) {
      throw new ConflictException("userId is required");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException("No user found for the provided userId");
    }

    return user;
  }
}
