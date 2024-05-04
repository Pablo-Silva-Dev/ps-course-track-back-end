import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DeleteClassUseCase } from "src/infra/useCases/classes/deleteClassUseCase";
import { z } from "zod";

const deleteClassBodySchema = z.object({
  classId: z.string(),
});

type DeleteClassBodySchema = z.infer<typeof deleteClassBodySchema>;

@Controller("/classes")
@UseGuards(AuthGuard("jwt"))
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
