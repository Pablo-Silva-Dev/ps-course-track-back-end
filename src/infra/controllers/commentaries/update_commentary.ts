import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const updateCommentaryBodySchema = z.object({
  content: z.string(),
});

type UpdateCommentaryBodySchema = z.infer<typeof updateCommentaryBodySchema>;

@Controller("/commentaries")
export class UpdateCommentaryController {
  constructor(private prisma: PrismaService) {}
  @Put(":commentaryId")
  @HttpCode(203)
  async handle(
    @Body() body: UpdateCommentaryBodySchema,
    @Param("commentaryId") commentaryId: string
  ) {
    const { content } = body;

    if (!commentaryId) {
      throw new ConflictException("commentaryId is required");
    }

    if (!content) {
      throw new ConflictException("content is required");
    }


    const module = await this.prisma.commentary.findUnique({
      where: {
        id: commentaryId,
      },
    });

    if (!module) {
      throw new NotFoundException("Commentary not found");
    }
    await this.prisma.commentary.update({
      where: {
        id: commentaryId,
      },
      data: {
        content,
      },
    });
  }
}
