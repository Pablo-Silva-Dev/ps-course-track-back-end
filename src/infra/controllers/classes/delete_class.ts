import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { DeleteClassUseCase } from "src/infra/useCases/classes/deleteClassUseCase";
import { z } from "zod";

const deleteClassBodySchema = z.object({
  classId: z.string(),
});

type DeleteClassBodySchema = z.infer<typeof deleteClassBodySchema>;

@Controller("/classes")
export class DeleteClassController {
  constructor(private deleteClassUseCase: DeleteClassUseCase) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: DeleteClassBodySchema) {
    const { classId } = body;

    if (!classId) {
      throw new ConflictException("classId is required");
    }

    await this.deleteClassUseCase.execute(classId);
  }
}
