import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { Commentary } from "../../entities/Commentary";
import { CommentariesRepository } from "../../repositories/implementations/commentariesRepository";

@Injectable()
export class CreateCommentaryUseCase {
  constructor(
    private commentariesRepository: CommentariesRepository,
    private usersRepository: UsersRepository
  ) {}
  async execute(commentaryData: Commentary) {
    const { userId, classId, courseId } = commentaryData;

    const userExists = await this.usersRepository.getUserById(userId);

    //ADD CLASS AND COURSE VALIDATION LIKE DONE WITH USER

    if (!userExists) {
      throw new NotFoundException("There is no user with the provided userId");
    }

    const commentary =
      await this.commentariesRepository.createCommentary(commentaryData);
    return commentary;
  }
}
