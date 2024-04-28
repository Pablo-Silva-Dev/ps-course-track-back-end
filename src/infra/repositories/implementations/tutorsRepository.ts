import { Injectable } from "@nestjs/common";
import { ICreateTutorDTO } from "src/infra/dtos/TutorDTO";
import { Tutor } from "src/infra/entities/Tutor";
import { PrismaService } from "src/infra/services/prismaService";
import { ITutorsRepository } from "../interfaces/tutorsRepository";

@Injectable()
export class TutorsRepository implements ITutorsRepository {
  constructor(private prisma: PrismaService) {}

  async createTutor({ name, bio }: ICreateTutorDTO): Promise<Tutor> {
    const tutorAlreadyExists = await this.prisma.tutor.findUnique({
      where: {
        name,
      },
    });

    if (!tutorAlreadyExists) {
      const createdTutor = await this.prisma.tutor.create({
        data: {
          name,
          bio,
        },
      });

      return createdTutor;
    }
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
  async updateTutor(tutorId: string, bio: string): Promise<void | Tutor> {
    const tutor = await this.prisma.tutor.findUnique({
      where: {
        id: tutorId,
      },
    });
    if (tutor) {
      const updatedTutor = await this.prisma.tutor.update({
        where: {
          id: tutorId,
        },
        data: {
          bio,
        },
      });
      return updatedTutor;
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
