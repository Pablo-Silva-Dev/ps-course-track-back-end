import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/infra/services/prismaService";
import { z } from "zod";

const listCommentariesBodySchema = z.object({
  classId: z.string(),
});

type ListCommentariesBodySchema = z.infer<typeof listCommentariesBodySchema>;

@Controller("/commentaries")
export class ListCommentariesController {
  constructor(private prisma: PrismaService) {}
  @Get()
  @HttpCode(200)
  async handle(@Body() body: ListCommentariesBodySchema) {
    const { classId } = body;

    if(!classId){
        throw new ConflictException('classId is required')
    }

    const classExists = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    const commentaries = await this.prisma.commentary.findMany({
      where: {
        classId,
      },
      include: {
        user: true,
      },
    });

    if (!classExists) {
      throw new NotFoundException("Class not found");
    }

    return commentaries;
  }
}
