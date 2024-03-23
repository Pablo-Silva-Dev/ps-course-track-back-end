import { Controller, Get, HttpCode } from "@nestjs/common";
import { PrismaService } from "../../services/prismaService";

@Controller("/users")
export class ListUsersController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const users = await this.prisma.user.findMany({
      include:{
        commentaries: true
      }
    });
    return users;
  }
}
