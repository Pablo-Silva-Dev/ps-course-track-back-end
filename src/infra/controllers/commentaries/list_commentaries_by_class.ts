import {
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Param,
} from "@nestjs/common";
import { ListCommentariesByClassUseCase } from "src/infra/useCases/commentaries/listCommentariesByClassUseCase";

@Controller("/commentaries/list-by-class")
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
