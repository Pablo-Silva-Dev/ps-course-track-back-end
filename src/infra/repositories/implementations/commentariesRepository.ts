import { Injectable } from "@nestjs/common";
import { Commentary } from "src/infra/entities/Commentary";
import { PrismaService } from "src/infra/services/prismaService";
import { ICommentariesRepository } from "../interfaces/commentariesRepository";
import { ICreateCommentaryDTO } from "src/infra/dtos/CommentaryDTO";

@Injectable()
export class CommentariesRepository implements ICommentariesRepository {
  constructor(private prisma: PrismaService) {}
  async createCommentary({
    userId,
    courseId,
    classId,
    content,
  }: ICreateCommentaryDTO): Promise<Commentary> {
    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    const existingClass = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (course && existingClass && user) {
      const commentary = await this.prisma.commentary.create({
        data: {
          userId,
          courseId,
          classId,
          content,
        },
      });
      return commentary
    }  }
  async listCommentaries(): Promise<Commentary[]> {
    const commentaries = await this.prisma.commentary.findMany();
    return commentaries;
  }
  async listCommentariesByUser(userId: string): Promise<Commentary[]> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      const commentaries = await this.prisma.commentary.findMany({
        where: {
          userId: user.id,
        },
      });
      return commentaries;
    }
  }
  async listCommentariesByClass(classId: string): Promise<Commentary[]> {
    const existingClass = await this.prisma.class.findUnique({
      where: {
        id: classId,
      },
    });

    if (existingClass) {
      const commentaries = await this.prisma.commentary.findMany({
        where: {
          id: existingClass.id,
        },
      });
      return commentaries;
    }
  }
  async getCommentary(commentaryId: string): Promise<void | Commentary> {
    const commentary = await this.prisma.commentary.findUnique({
      where: {
        id: commentaryId,
      },
    });

    if (commentary) {
      return commentary;
    }
  }
  async updateCommentary(
    commentaryId: string,
    content: string
  ): Promise<Commentary | void> {
    const commentary = await this.prisma.commentary.findUnique({
      where: {
        id: commentaryId,
      },
    });

    if (commentary) {
      const updatedCommentary = await this.prisma.commentary.update({
        where: {
          id: commentaryId,
        },
        data: {
          content,
        },
      });
      return updatedCommentary;
    }
  }
  async deleteCommentary(commentaryId: string): Promise<void> {
    const commentary = await this.prisma.commentary.findUnique({
      where: {
        id: commentaryId,
      },
    });
    if (commentary) {
      await this.prisma.commentary.delete({
        where: {
          id: commentaryId,
        },
      });
    }
  }
}
