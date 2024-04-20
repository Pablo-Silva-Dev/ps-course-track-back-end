import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ListClassesByModuleUseCase } from "src/infra/useCases/classes/listClassesByModuleUseCase";

@Controller("/classes/list-by-module")
export class ListClassesByModuleController {
  constructor(private listClassesByModuleUseCase: ListClassesByModuleUseCase) {}
  @Get(":moduleId")
  @HttpCode(200)
  async handle(@Param("moduleId") moduleId: string) {
    const classes = await this.listClassesByModuleUseCase.execute(moduleId);
    return classes;
  }
}
