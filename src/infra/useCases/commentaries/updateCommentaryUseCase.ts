import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentariesRepository } from "../../repositories/implementations/commentariesRepository";

@Injectable()
export class UpdateCommentaryUseCase {
  constructor(private commentariesRepository: CommentariesRepository) {}
  async execute(commentaryId: string, content: string) {
    const commentary =
      await this.commentariesRepository.getCommentary(commentaryId);
    if (!commentary) {
      throw new NotFoundException(
        "Not found a commentary with the provided commentaryId."
      );
    }

    const updatedCommentary =
      await this.commentariesRepository.updateCommentary(commentaryId, content);
    return updatedCommentary;
  }
}
