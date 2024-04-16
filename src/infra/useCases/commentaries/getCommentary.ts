import { Injectable, NotFoundException } from "@nestjs/common";
import { CommentariesRepository } from "../../repositories/implementations/commentariesRepository";

@Injectable()
export class GetCommentaryUseCase {
  constructor(private commentariesRepository: CommentariesRepository) {}
  async execute(commentaryId: string) {
    const commentary =
      await this.commentariesRepository.getCommentary(commentaryId);
    if (!commentary) {
      throw new NotFoundException(
        "No commentary found for the provided commentaryId"
      );
    }
    return commentary;
  }
}
