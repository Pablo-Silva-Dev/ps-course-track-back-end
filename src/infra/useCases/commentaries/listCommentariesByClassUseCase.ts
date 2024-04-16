import { Injectable } from "@nestjs/common";
import { CommentariesRepository } from "../../repositories/implementations/commentariesRepository";

@Injectable()
export class ListCommentariesByClassUseCase {
  constructor(private commentariesRepository: CommentariesRepository) {}
  async execute(classId: string) {
    const commentaries =
      await this.commentariesRepository.listCommentariesByClass(classId);
    // ADD CLASS EXISTENCE VALIDATION
    return commentaries;
  }
}
