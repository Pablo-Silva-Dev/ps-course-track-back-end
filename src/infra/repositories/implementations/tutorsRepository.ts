import { Injectable } from "@nestjs/common";
import { Tutor } from "src/infra/entities/Tutor";
import { PrismaService } from "src/infra/services/prismaService";
import { ITutorsRepository } from "../interfaces/tutorsRepository";

@Injectable()
export class TutorsRepository implements ITutorsRepository {
  constructor(private prisma: PrismaService) {}
  async createTutor({ name, bio }: Tutor): Promise<Tutor> {
    const tutor = await this.prisma.tutor.create({
      data: {
        name,
        bio,
      },
    });

    return tutor;
  }
  async listTutors(): Promise<Tutor[]> {
    const tutors = await this.prisma.tutor.findMany();
    return tutors;
  }
  async getTutorById(tutorId: string): Promise<void | Tutor> {
    const tutor = await this.prisma.tutor.findUnique({
      where: {
        id: tutorId,
      },
    });

    if (tutor) {
      return tutor;
    }

    return null;
  }
  async getTutorByName(name: string): Promise<void | Tutor> {
    const tutor = await this.prisma.tutor.findUnique({
      where: {
        name,
      },
    });

    if (tutor) {
      return tutor;
    }

    return null;
  }
  async updateTutor(
    tutorId: string,
    data: { bio: string }
  ): Promise<void | Tutor> {
    const tutor = await this.prisma.tutor.findUnique({
      where: {
        id: tutorId,
      },
    });
    if (tutor) {
      await this.prisma.tutor.update({
        where: {
          id: tutorId,
        },
        data,
      });
    }
  }
  async deleteTutor(tutorId: string): Promise<void> {
    const tutor = await this.prisma.tutor.findUnique({
      where: {
        id: tutorId,
      },
    });

    if (tutor) {
      await this.prisma.tutor.delete({
        where: {
          id: tutorId,
        },
      });
    }
  }
}
