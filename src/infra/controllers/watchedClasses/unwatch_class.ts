import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UnwatchClassUseCase } from "src/infra/useCases/watchedClasses/unwatchClass";
import { z } from "zod";

const unwatchClassBodySchema = z.object({
  userId: z.string(),
  classId: z.string(),
});

type UnwatchClassBodySchema = z.infer<typeof unwatchClassBodySchema>;

@Controller("watched-classes/unwatch")
@UseGuards(AuthGuard("jwt"))
export class UnwatchClassesController {
  constructor(private unwatchClassUseCase: UnwatchClassUseCase) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: UnwatchClassBodySchema) {
    const { classId, userId } = unwatchClassBodySchema.parse(body);

    if (!classId) {
      throw new ConflictException("classId is required.");
    }

    if (!userId) {
      throw new ConflictException("classId is required.");
    }

    await this.unwatchClassUseCase.execute(userId, classId);
  }
}
