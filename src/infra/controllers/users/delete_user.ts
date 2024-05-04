import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DeleteUserUseCase } from "src/infra/useCases/users/deleteUserUseCase";
import { z } from "zod";

const deleteUserBodySchema = z.object({
  userId: z.string(),
});

type DeleteUserBodySchema = z.infer<typeof deleteUserBodySchema>;

@Controller("/users")
@UseGuards(AuthGuard("jwt"))
export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: DeleteUserBodySchema) {
    const { userId } = body;

    const isBodyValidated = deleteUserBodySchema.safeParse(body);

    if (!isBodyValidated) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    if (!userId) {
      throw new ConflictException("userId is required");
    }

    await this.deleteUserUseCase.execute(userId);
  }
}
