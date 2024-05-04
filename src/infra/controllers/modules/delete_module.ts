import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DeleteModuleUseCase } from "src/infra/useCases/modules/deleteModuleUseCase";

@Controller("/modules")
@UseGuards(AuthGuard("jwt"))
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
