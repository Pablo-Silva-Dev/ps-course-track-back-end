import { Controller, Get, HttpCode } from "@nestjs/common";
import { ListCommentariesUseCase } from "src/infra/useCases/commentaries/listCommentariesUseCase";


@Controller("/commentaries")
export class ListCommentariesController {
  constructor(private listCommentariesUseCase: ListCommentariesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const commentaries = await this.listCommentariesUseCase.execute();

    return commentaries;
  }
}
