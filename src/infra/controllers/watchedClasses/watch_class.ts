import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { WatchClassUseCase } from "src/infra/useCases/watchedClasses/watchClassUseCase";
import { z } from "zod";

const watchClassBodySchema = z.object({
  userId: z.string(),
  classId: z.string(),
});

type WatchClassBodySchema = z.infer<typeof watchClassBodySchema>;

@Controller("watched-classes/watch")
export class WatchClassesController {
  constructor(private watchClassUseCase: WatchClassUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: WatchClassBodySchema) {
    const { classId, userId } = watchClassBodySchema.parse(body);

    if (!classId) {
      throw new ConflictException("classId is required.");
    }

    if (!userId) {
      throw new ConflictException("classId is required.");
    }

    const registerWatchedClass = await this.watchClassUseCase.execute(
      userId,
      classId
    );

    return registerWatchedClass;
  }
}
