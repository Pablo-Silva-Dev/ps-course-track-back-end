import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { DeleteModuleUseCase } from "src/infra/useCases/modules/deleteModuleUseCase";

@Controller("/modules")
export class DeleteModuleController {
  constructor(private deleteModuleUseCase: DeleteModuleUseCase) {}
  @Delete(":moduleId")
  @HttpCode(204)
  async handle(@Param("moduleId") moduleId: string) {
    if (!moduleId) {
      throw new ConflictException("moduleId is required");
    }
    await this.deleteModuleUseCase.execute(moduleId);
  }
}
