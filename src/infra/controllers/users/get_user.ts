import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
} from "@nestjs/common";
import { GetUserUseCase } from "src/infra/useCases/users/getUserUseCase";
import { z } from "zod";

const getUserBodySchema = z.object({
  userId: z.string().optional(),
});

type GetUserBodySchema = z.infer<typeof getUserBodySchema>;

@Controller("/users/getUnique")
export class GetUserController {
  constructor(private getUserUseCase: GetUserUseCase) {}
  @Get()
  @HttpCode(200)
  async handle(@Body() body: GetUserBodySchema) {
    const isBodyValidated = getUserBodySchema.safeParse(body);

    if (!isBodyValidated) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    const { userId } = getUserBodySchema.parse(body);

    if (!userId) {
      throw new ConflictException("userId is required");
    }

    const user = await this.getUserUseCase.execute(userId);
    return user;
  }
}
