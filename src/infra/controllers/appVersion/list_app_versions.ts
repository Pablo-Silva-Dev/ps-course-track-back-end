import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListAppVersionsUseCase } from "../../useCases/appVersions/listAppVersionsUseCase";

@Controller("/appVersion/list")
@UseGuards(AuthGuard("jwt-admin"))
export class ListAppVersionsController {
  constructor(private listAppVersionsUseCase: ListAppVersionsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const appVersions = await this.listAppVersionsUseCase.execute();
    return appVersions;
  }
}
