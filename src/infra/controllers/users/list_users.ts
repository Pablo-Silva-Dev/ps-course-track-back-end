import { Controller, Get, HttpCode } from "@nestjs/common";
import { ListUsersUseCase } from "src/infra/useCases/users/listUsersUseCase";

@Controller("/users")
export class ListUsersController {
  constructor(private listUsersUseCase: ListUsersUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const users = await this.listUsersUseCase.execute();
    return users;
  }
}
