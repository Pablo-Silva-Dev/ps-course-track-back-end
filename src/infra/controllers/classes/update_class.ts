import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { UpdateClassUseCase } from "src/infra/useCases/classes/updateClassUseCase";
import { z } from "zod";

const updateClassBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  url: z.string(),
  moduleId: z.string(),
  tutorId: z.string(),
  courseId: z.string(),
});

type UpdateClassBodySchema = z.infer<typeof updateClassBodySchema>;

@Controller("/classes")
export class UpdateClassController {
  constructor(private updateClassUseCase: UpdateClassUseCase) {}
  @Put(":classId")
  @HttpCode(203)
  async handle(
    @Param("classId") classId: string,
    @Body() body: UpdateClassBodySchema
  ) {
    const { url, description, name } = body;

    if (!classId) {
      throw new ConflictException("classId is required");
    }

    if (!name || !url || !description) {
      throw new ConflictException(
        "'name', 'url', and 'description' are required fields"
      );
    }

    if (!name || !url || !description) {
      throw new ConflictException(
        "'name', 'url', and 'description' are required fields"
      );
    }

    const updatedClass = await this.updateClassUseCase.execute(classId, {
      name,
      url,
      description,
    });

    return updatedClass;
  }
}
