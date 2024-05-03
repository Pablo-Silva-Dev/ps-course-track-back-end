import { Injectable, UnauthorizedException } from "@nestjs/common";
import { SessionsRepository } from "src/infra/repositories/implementations/sessionsRepository";

@Injectable()
export class AuthenticateUserUseCase {
  constructor(private sessionsRepository: SessionsRepository) {}
  async execute(email: string, password: string) {
    const token = await this.sessionsRepository.authenticateUser(
      email,
      password
    );

    if (!token) {
      throw new UnauthorizedException("Incorrect credentials");
    }

    return token;
  }
}
