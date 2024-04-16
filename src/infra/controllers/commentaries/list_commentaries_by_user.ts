import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { ListCommentariesByUserUseCase } from "src/infra/useCases/commentaries/listCommentariesByUserUseCase";

@Controller("/commentaries/list-by-user")
export class ListCommentariesByUserController {
  constructor(
    private listCommentariesByUserUseCase: ListCommentariesByUserUseCase
  ) {}
  @Get(":userId")
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    if (!userId) {
      throw new ConflictException("userId is required");
    }

    const commentaries =
      await this.listCommentariesByUserUseCase.execute(userId);

    return commentaries;
  }
}
