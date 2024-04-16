import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { DeleteCommentaryUseCase } from "src/infra/useCases/commentaries/deleteCommentaryUseCase";

@Controller("/commentaries")
export class DeleteCommentaryController {
  constructor(private deleteCommentaryUseCase: DeleteCommentaryUseCase) {}
  @Delete(":commentaryId")
  @HttpCode(204)
  async handle(@Param("commentaryId") commentaryId: string) {
    await this.deleteCommentaryUseCase.execute(commentaryId);
  }
}
