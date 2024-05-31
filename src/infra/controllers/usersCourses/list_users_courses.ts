import { Controller, Get, HttpCode } from "@nestjs/common";
import { ListUsersCoursesUseCase } from "src/infra/useCases/usersCourses/listUsersCoursesUseCase";

@Controller("/users-courses")
export class ListUsersCoursesController {
  constructor(private listUsersCoursesUseCase: ListUsersCoursesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const usersCourses = await this.listUsersCoursesUseCase.execute();
    return usersCourses;
  }
}
