import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetCommentaryUseCase } from "src/infra/useCases/commentaries/getCommentary";

@Controller("/commentaries/getUnique")
export class GetCommentaryController {
  constructor(private getCommentaryUseCase: GetCommentaryUseCase) {}
  @Get(":commentaryId")
  @HttpCode(200)
  async handle(@Param("commentaryId") commentaryId: string) {
    const commentary = await this.getCommentaryUseCase.execute(commentaryId);

    return commentary;
  }
}
