import { Controller, Get, HttpCode } from "@nestjs/common";
import { ListAppVersionsUseCase } from "../../useCases/appVersions/listAppVersionsUseCase";

@Controller("/appVersion/list")
export class ListAppVersionsController {
  constructor(private listAppVersionsUseCase: ListAppVersionsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const appVersions = await this.listAppVersionsUseCase.execute();
    return appVersions;
  }
}
