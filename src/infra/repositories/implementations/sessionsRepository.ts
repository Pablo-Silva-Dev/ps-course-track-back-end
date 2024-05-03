import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { PrismaService } from "src/infra/services/prismaService";
import { ISessionsRepository } from "../interfaces/sessionsRepository";

@Injectable()
export class SessionsRepository implements ISessionsRepository {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}
  async authenticateUser(
    email: string,
    password: string
  ): Promise<{ token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      const isPasswordValid = await compare(password, user.password);
      if (isPasswordValid) {
        const token = this.jwt.sign({ sub: user.id }, { expiresIn: "7d" });
        return {
          token,
        };
      }
    }
  }
}
