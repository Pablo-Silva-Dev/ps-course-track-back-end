import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Inject,
} from "@nestjs/common";
import { GetTutorUseCase } from "src/infra/useCases/tutors/getTutorUseCase";
import { z } from "zod";

const getTutorBodySchema = z.object({
  tutorId: z.string(),
});

type GetTutorBodySchema = z.infer<typeof getTutorBodySchema>;

@Controller("/tutors/getUnique")
export class GetTutorController {
  constructor(
    @Inject(GetTutorUseCase) private getTutorUseCase: GetTutorUseCase
  ) {}
  @Get()
  @HttpCode(200)
  async handle(@Body() body: GetTutorBodySchema) {
    const { tutorId } = body;

    if (!tutorId) {
      throw new ConflictException("tutorId is required");
    }

    const tutor = await this.getTutorUseCase.execute(tutorId);

    return tutor;
  }
}
