import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const deleteUserBodySchema = z.object({
  userId: z.string(),
});

type DeleteUserBodySchema = z.infer<typeof deleteUserBodySchema>;

@Controller("/users")
export class DeleteUserController {
  constructor(private prisma: PrismaService) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: DeleteUserBodySchema) {
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
      throw new NotFoundException("No found a user with the specified id");
    }

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
  }
}
