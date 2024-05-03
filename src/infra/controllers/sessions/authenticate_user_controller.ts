import { Body, ConflictException, Controller, Post } from "@nestjs/common";
import { z } from "zod";
import { AuthenticateUserUseCase } from "./../../useCases/sessions/authenticateUserUseCase";

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type AuthenticateUserBodySchema = z.infer<typeof authenticateBodySchema>;

@Controller("/sessions/authenticate-user")
export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  @Post()
  async handle(@Body() body: AuthenticateUserBodySchema) {
    const { email, password } = body;
    if (!email || !password) {
      throw new ConflictException(
        "Email and password are required for authentication"
      );
    }
    const token = this.authenticateUserUseCase.execute(email, password);
    return token;
  }
}
