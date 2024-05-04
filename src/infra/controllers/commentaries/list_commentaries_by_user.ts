import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListCommentariesByUserUseCase } from "src/infra/useCases/commentaries/listCommentariesByUserUseCase";

@Controller("/commentaries/list-by-user")
@UseGuards(AuthGuard("jwt"))
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
