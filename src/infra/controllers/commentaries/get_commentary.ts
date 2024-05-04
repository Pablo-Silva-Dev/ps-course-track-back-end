import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetCommentaryUseCase } from "src/infra/useCases/commentaries/getCommentary";

@Controller("/commentaries/getUnique")
@UseGuards(AuthGuard("jwt"))
export class GetCommentaryController {
  constructor(private getCommentaryUseCase: GetCommentaryUseCase) {}
  @Get(":commentaryId")
  @HttpCode(200)
  async handle(@Param("commentaryId") commentaryId: string) {
    const commentary = await this.getCommentaryUseCase.execute(commentaryId);

    return commentary;
  }
}
