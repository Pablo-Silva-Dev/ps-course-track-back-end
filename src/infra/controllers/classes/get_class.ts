import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
} from "@nestjs/common";
import { GetClassUseCase } from "src/infra/useCases/classes/getClassUseCase";
import { z } from "zod";

const getClassBodySchema = z.object({
  classId: z.string(),
});

type GetClassBodySchema = z.infer<typeof getClassBodySchema>;

@Controller("/classes/getUnique")
export class GetClassController {
  constructor(private getClassUseCase: GetClassUseCase) {}
  @Get()
  @HttpCode(200)
  async handle(@Body() body: GetClassBodySchema) {
    const { classId } = body;

    if (!classId) {
      throw new ConflictException("classId is required");
    }

    const foundClass = await this.getClassUseCase.execute(classId);

    return foundClass;
  }
}
