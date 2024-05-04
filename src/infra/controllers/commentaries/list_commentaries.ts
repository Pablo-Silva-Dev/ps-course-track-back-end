import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListCommentariesUseCase } from "src/infra/useCases/commentaries/listCommentariesUseCase";

@Controller("/commentaries")
@UseGuards(AuthGuard("jwt"))
export class ListCommentariesController {
  constructor(private listCommentariesUseCase: ListCommentariesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const commentaries = await this.listCommentariesUseCase.execute();

    return commentaries;
  }
}
