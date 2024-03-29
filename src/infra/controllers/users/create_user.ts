import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { CreateUserUseCase } from "../../useCases/createUserUseCase";

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  phone: z.string(),
  password: z.string(),
});

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

@Controller("/users")
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateUserBodySchema) {
    const { name, email, cpf, phone, password } =
      createUserBodySchema.parse(body);

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
