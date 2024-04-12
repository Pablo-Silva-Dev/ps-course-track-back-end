import { Controller, Get, HttpCode } from "@nestjs/common";
import { ListTutorsUseCase } from "../../useCases/tutors/listTutorsUseCase";

@Controller("/tutors")
export class ListTutorsController {
  constructor(private listTutorsUseCase: ListTutorsUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const tutors = await this.listTutorsUseCase.execute();
    return tutors;
  }
}
