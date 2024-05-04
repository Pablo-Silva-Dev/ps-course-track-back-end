import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetClassUseCase } from "src/infra/useCases/classes/getClassUseCase";
import { z } from "zod";

const getClassBodySchema = z.object({
  classId: z.string(),
});

type GetClassBodySchema = z.infer<typeof getClassBodySchema>;

@Controller("/classes/getUnique")
@UseGuards(AuthGuard("jwt"))
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
