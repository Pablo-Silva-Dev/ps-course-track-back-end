import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListTutorsUseCase } from "../../useCases/tutors/listTutorsUseCase";

@Controller("/tutors")
@UseGuards(AuthGuard("jwt"))
export class ListTutorsController {
  constructor(private listTutorsUseCase: ListTutorsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const tutors = await this.listTutorsUseCase.execute();
    return tutors;
  }
}
