import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListClassesByModuleUseCase } from "src/infra/useCases/classes/listClassesByModuleUseCase";

@Controller("/classes/list-by-module")
@UseGuards(AuthGuard("jwt"))
export class ListClassesByModuleController {
  constructor(private listClassesByModuleUseCase: ListClassesByModuleUseCase) {}
  @Get(":moduleId")
  @HttpCode(200)
  async handle(@Param("moduleId") moduleId: string) {
    const classes = await this.listClassesByModuleUseCase.execute(moduleId);
    return classes;
  }
}
