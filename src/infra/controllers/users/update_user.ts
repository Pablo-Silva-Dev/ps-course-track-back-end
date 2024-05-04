import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";
import { UpdateUserUseCase } from "../../useCases/users/updateUserUseCase";

const updateUserBodySchema = z.object({
  userId: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
});

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;

@Controller("/users")
@UseGuards(AuthGuard("jwt"))
export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}
  @Put()
  @HttpCode(203)
  async execute(@Body() body: UpdateUserBodySchema) {
    const { userId, password, phone } = updateUserBodySchema.parse(body);

    if (!userId) {
      throw new ConflictException("userId is required");
    }

    const updatedUser = await this.updateUserUseCase.execute(userId, {
      password,
      phone,
    });
    return updatedUser;
  }
}
