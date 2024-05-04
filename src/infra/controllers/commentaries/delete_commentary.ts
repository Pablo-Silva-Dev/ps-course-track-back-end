import { Controller, Delete, HttpCode, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DeleteCommentaryUseCase } from "src/infra/useCases/commentaries/deleteCommentaryUseCase";

@Controller("/commentaries")
@UseGuards(AuthGuard("jwt"))
export class DeleteCommentaryController {
  constructor(private deleteCommentaryUseCase: DeleteCommentaryUseCase) {}
  @Delete(":commentaryId")
  @HttpCode(204)
  async handle(@Param("commentaryId") commentaryId: string) {
    await this.deleteCommentaryUseCase.execute(commentaryId);
  }
}
