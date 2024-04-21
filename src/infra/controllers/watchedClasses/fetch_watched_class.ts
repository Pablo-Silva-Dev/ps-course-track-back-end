import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { z } from "zod";
import { FetchWatchedClassUseCase } from "../../useCases/watchedClasses/fetchClassUseCase";

const fetchClassBodySchema = z.object({
  userId: z.string(),
  classId: z.string(),
});

type FetchClassBodySchema = z.infer<typeof fetchClassBodySchema>;

@Controller("watched-classes/fetch")
export class FetchClassController {
  constructor(private fetchWatchedClassUseCase: FetchWatchedClassUseCase) {}
  @Post()
  @HttpCode(200)
  async handle(@Body() body: FetchClassBodySchema) {
    const { classId, userId } = fetchClassBodySchema.parse(body);

    const watchedClass = await this.fetchWatchedClassUseCase.execute(
      userId,
      classId
    );

    return watchedClass;
  }
}
