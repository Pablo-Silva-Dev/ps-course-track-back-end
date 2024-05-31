import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ListUsersCoursesByUserUseCase } from "src/infra/useCases/usersCourses/listUsersCoursesByUserUseCase";

@Controller("/users-courses-get-unique")
export class ListUsersCoursesByUserController {
  constructor(
    private listUsersCoursesByUserUseCase: ListUsersCoursesByUserUseCase
  ) {}
  @Get(":userId")
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    const usersCourses =
      await this.listUsersCoursesByUserUseCase.execute(userId);
    return usersCourses;
  }
}
