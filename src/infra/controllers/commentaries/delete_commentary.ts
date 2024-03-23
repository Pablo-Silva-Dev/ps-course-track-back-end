import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const deleteCommentaryBodySchema = z.object({
  commentaryId: z.string(),
});

type DeleteCommentaryBodySchema = z.infer<typeof deleteCommentaryBodySchema>;

@Controller("/commentaries")
export class DeleteCommentaryController {
  constructor(private prisma: PrismaService) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: DeleteCommentaryBodySchema) {
    const { commentaryId } = body;

    if (!commentaryId) {
      throw new ConflictException("commentaryId is required");
    }

    const commentary = await this.prisma.commentary.findUnique({
      where: {
        id: commentaryId,
      },
    });

    if (!commentary) {
      throw new NotFoundException(
        "No found a commentary with the specified id"
      );
    }

    await this.prisma.commentary.delete({
      where: {
        id: commentaryId,
      },
    });
  }
}
