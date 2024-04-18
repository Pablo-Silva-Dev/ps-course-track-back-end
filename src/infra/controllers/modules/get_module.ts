import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { GetModuleUseCase } from "src/infra/useCases/modules/getModuleUseCase";

@Controller("/modules/getUnique")
export class GetModuleController {
  constructor(private getModuleUseCase: GetModuleUseCase) {}
  @Get(":moduleId")
  @HttpCode(200)
  async handle(@Param("moduleId") moduleId: string) {
    if (!moduleId) {
      throw new ConflictException("moduleId is required");
    }

    const module = await this.getModuleUseCase.execute(moduleId);
    return module;
  }
}
