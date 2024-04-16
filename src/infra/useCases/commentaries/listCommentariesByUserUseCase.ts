import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { CommentariesRepository } from "../../repositories/implementations/commentariesRepository";

@Injectable()
export class ListCommentariesByUserUseCase {
  constructor(
    private commentariesRepository: CommentariesRepository,
    private usersRepository: UsersRepository
  ) {}
  async execute(userId: string) {
    if (!userId) {
      throw new ConflictException("userId is required");
    }

    const userExists = await this.usersRepository.getUserById(userId);

    if (!userExists) {
      throw new NotFoundException("Not found an user with the provided userId");
    }

    const commentaries =
      await this.commentariesRepository.listCommentariesByUser(userId);
    return commentaries;
  }
}
