import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UpdateCommentaryUseCase } from "src/infra/useCases/commentaries/updateCommentaryUseCase";
import { z } from "zod";

const updateCommentaryBodySchema = z.object({
  content: z.string(),
});

type UpdateCommentaryBodySchema = z.infer<typeof updateCommentaryBodySchema>;

@Controller("/commentaries")
@UseGuards(AuthGuard("jwt"))
export class UpdateCommentaryController {
  constructor(private updateCommentaryUseCase: UpdateCommentaryUseCase) {}
  @Put(":commentaryId")
  @HttpCode(203)
  async handle(
    @Body() body: UpdateCommentaryBodySchema,
    @Param("commentaryId") commentaryId: string
  ) {
    const { content } = body;

    if (!content) {
      throw new ConflictException("content is required");
    }

    const updatedCommentary = await this.updateCommentaryUseCase.execute(
      commentaryId,
      content
    );

    return updatedCommentary;
  }
}
