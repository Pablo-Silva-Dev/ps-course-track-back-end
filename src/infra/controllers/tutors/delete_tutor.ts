import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Inject,
} from "@nestjs/common";
import { DeleteTutorUseCase } from "src/infra/useCases/tutors/deleteTutorUseCase";
import { z } from "zod";

const deleteTutorBodySchema = z.object({
  tutorId: z.string(),
});

type DeleteTutorBodySchema = z.infer<typeof deleteTutorBodySchema>;

@Controller("/tutors")
export class DeleteTutorController {
  constructor(
    @Inject(DeleteTutorUseCase) private deleteTutorUseCase: DeleteTutorUseCase
  ) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: DeleteTutorBodySchema) {
    const { tutorId } = body;

    if (!tutorId) {
      throw new ConflictException("tutorId is required");
    }

    await this.deleteTutorUseCase.execute(tutorId);
  }
}
