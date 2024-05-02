import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { z } from "zod";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateUserBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions")
export class AuthenticateUserController {
  constructor(
    private jwt: JwtService,
    private usersRepository: UsersRepository
  ) {}

  @Post()
  async handle(@Body() body: AuthenticateUserBodySchema) {
    const { email, password } = body;
    const user = await this.usersRepository.getUserByEmail(email);
    const isPasswordValid = await compare(password, user.password);

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException("User credentials do not match");
    }

    const token = this.jwt.sign({ sub: user.id });
    return token;
  }
}
