import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { UpdateUserUseCase } from "../../useCases/users/updateUserUseCase";

const updateUserBodySchema = z.object({
  userId: z.string().optional(),
  password: z.string().optional(),
});

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;

@Controller("/users")
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  @Put()
  @HttpCode(203)
  async execute(@Body() body: UpdateUserBodySchema) {
    const isBodyParsed = updateUserBodySchema.safeParse(body);

    const { userId, password } = updateUserBodySchema.parse(body);

    if (!isBodyParsed || !password || !userId) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    await this.updateUserUseCase.execute(userId, password);
  }
}
