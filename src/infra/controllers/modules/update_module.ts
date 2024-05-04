import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UpdateModuleUseCase } from "src/infra/useCases/modules/updateModuleUseCase";
import { z } from "zod";

const updateModuleBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().optional(),
  cover_url: z.string().optional(),
});

type UpdateModuleBodySchema = z.infer<typeof updateModuleBodySchema>;

@Controller("/modules")
@UseGuards(AuthGuard("jwt"))
export class UpdateModuleController {
  constructor(private updateModuleUseCase: UpdateModuleUseCase) {}
  @Put(":moduleId")
  @HttpCode(203)
  async handle(
    @Body() body: UpdateModuleBodySchema,
    @Param("moduleId") moduleId: string
  ) {
    const { cover_url, name, description, duration } = body;

    if (!moduleId) {
      throw new ConflictException("moduleId is required");
    }

    const updatedModule = await this.updateModuleUseCase.execute(moduleId, {
      cover_url,
      name,
      description,
      duration,
    });
    return updatedModule;
  }
}
