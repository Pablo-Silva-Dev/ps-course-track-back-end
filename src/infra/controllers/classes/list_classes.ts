import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListClassesUseCase } from "src/infra/useCases/classes/listClassesUseCase";

@Controller("/classes")
@UseGuards(AuthGuard("jwt"))
export class ListClassesController {
  constructor(private listClassesUseCase: ListClassesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const classes = await this.listClassesUseCase.execute();
    return classes;
  }
}
