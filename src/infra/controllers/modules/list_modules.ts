import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListModulesUseCase } from "src/infra/useCases/modules/listModulesUseCase";

@Controller("/modules")
@UseGuards(AuthGuard("jwt"))
export class ListModulesController {
  constructor(private listModulesUseCase: ListModulesUseCase) {}
  @Get(":courseId")
  @HttpCode(200)
  async handle(@Param("courseId") courseId: string) {
    if (!courseId) {
      throw new ConflictException("courseId is required");
    }
    const modules = await this.listModulesUseCase.execute(courseId);
    return modules;
  }
}
