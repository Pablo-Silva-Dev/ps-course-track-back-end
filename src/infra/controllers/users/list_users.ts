import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListUsersUseCase } from "src/infra/useCases/users/listUsersUseCase";

@Controller("/users")
@UseGuards(AuthGuard("jwt"))
export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const users = await this.listUsersUseCase.execute();
    return users;
  }
}
