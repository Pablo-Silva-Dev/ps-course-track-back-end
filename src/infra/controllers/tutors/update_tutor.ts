import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { UpdateTutorUseCase } from "src/infra/useCases/tutors/updateTutorUseCase";
import { z } from "zod";

const updateTutorBodySchema = z.object({
  bio: z.string(),
});

type UpdateTutorBodySchema = z.infer<typeof updateTutorBodySchema>;

@Controller("/tutors")
export class UpdateTutorController {
  constructor(private updateTutorUseCase: UpdateTutorUseCase) {}
  @Put(":tutorId")
  @HttpCode(203)
  async handle(
    @Body() body: UpdateTutorBodySchema,
    @Param("tutorId") tutorId: string
  ) {
    const isBodyParsed = updateTutorBodySchema.safeParse(body);
    const { bio } = updateTutorBodySchema.parse(body);

    if (!isBodyParsed || !bio) {
      throw new ConflictException(
        "Its necessary provide a bio to update a tutor."
      );
    }

    await this.updateTutorUseCase.execute(tutorId, {
      bio,
    });
  }
}
