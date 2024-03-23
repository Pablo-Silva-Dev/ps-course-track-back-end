import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
  NotFoundException
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";
import {hash} from 'bcryptjs'

const updateUserBodySchema = z.object({
  name: z.string(),
  phone: z.string(),
  password: z.string(),
});

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;

const PASSWORD_ENCRYPTION_SALT_LEVEL = 6

@Controller("/users")
export class UpdateUserController {
  constructor(private prisma: PrismaService) {}
  @Put(":userId")
  @HttpCode(203)
  async handle(
    @Body() body: UpdateUserBodySchema,
    @Param("userId") userId: string
  ) {
    const { phone, name, password } = body;

    if (!userId) {
      throw new ConflictException("userId is required");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const encryptedPassword = await hash(password, PASSWORD_ENCRYPTION_SALT_LEVEL)

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        phone,
        password : encryptedPassword,
      },
    });
  }
}
