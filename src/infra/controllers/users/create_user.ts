import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";
import { CreateUserUseCase } from "../../useCases/users/createUserUseCase";

const createUserBodySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  cpf: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller("/users")
@UseGuards(AuthGuard("jwt"))
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateUserBodySchema) {
    const isBodyValidated = createUserBodySchema.safeParse(body);
    const { name, email, cpf, phone, password } =
      createUserBodySchema.parse(body);

    if (!isBodyValidated || !name || !email || !password || !phone || !cpf) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    const user = await this.createUserUseCase.execute({
      name,
      email,
      cpf,
      phone,
      password,
    });
    return user;
  }
}
