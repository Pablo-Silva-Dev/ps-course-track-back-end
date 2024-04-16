import { Injectable } from "@nestjs/common";
import { CommentariesRepository } from "../../repositories/implementations/commentariesRepository";

@Injectable()
export class ListCommentariesUseCase {
  constructor(private commentariesRepository: CommentariesRepository) {}
  async execute() {
    const commentaries = await this.commentariesRepository.listCommentaries();
    return commentaries;
  }
}
