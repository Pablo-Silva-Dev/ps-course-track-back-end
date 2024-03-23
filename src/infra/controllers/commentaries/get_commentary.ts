import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const getCommentaryBodySchema = z.object({
  commentaryId: z.string(),
});

type GetCommentaryBodySchema = z.infer<typeof getCommentaryBodySchema>;

@Controller("/commentaries/getUnique")
export class GetCommentaryController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle(@Body() body: GetCommentaryBodySchema) {
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
        "No commentary found for the provided commentaryId"
      );
    }

    return commentary;
  }
}
