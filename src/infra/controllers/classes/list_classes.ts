import { Controller, Get, HttpCode } from "@nestjs/common";
import { ListClassesUseCase } from "src/infra/useCases/classes/listClassesUseCase";

@Controller("/classes")
export class ListClassesController {
  constructor(private listClassesUseCase: ListClassesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const classes = await this.listClassesUseCase.execute();
    return classes;
  }
}
