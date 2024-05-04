import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListCommentariesByClassUseCase } from "src/infra/useCases/commentaries/listCommentariesByClassUseCase";

@Controller("/commentaries/list-by-class")
@UseGuards(AuthGuard("jwt"))
export class ListCommentariesByClassController {
  constructor(
    private listCommentariesByClassUseCase: ListCommentariesByClassUseCase
  ) {}
  @Get(":classId")
  @HttpCode(200)
  async handle(@Param("classId") classId: string) {
    if (!classId) {
      throw new ConflictException("classId is required");
    }

    const commentaries =
      await this.listCommentariesByClassUseCase.execute(classId);

    return commentaries;
  }
}
