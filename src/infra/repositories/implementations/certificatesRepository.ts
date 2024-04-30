import { Injectable } from "@nestjs/common";
import { Certificate } from "src/infra/entities/Certificate";
import { PrismaService } from "src/infra/services/prismaService";
import { ICertificatesRepository } from "../interfaces/certificatesRepository";

@Injectable()
export class CertificatesRepository implements ICertificatesRepository {
  constructor(private prisma: PrismaService) {}
  async create(data: ICreateCertificateDTO): Promise<Certificate> {
    const { userId, courseId } = data;

    const course = await this.prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const certificate = await this.prisma.certificate.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    if (course && user && !certificate) {
      const createdCertificate = await this.prisma.certificate.create({
        data,
      });
      return createdCertificate;
    }
  }

  async checkIfCertificateExists(
    userId: string,
    courseId: string
  ): Promise<boolean> {
    const certificate = await this.prisma.certificate.findFirst({
      where: {
        userId,
        courseId,
      },
    });

    if (certificate) {
      return true;
    }
    return false;
  }

  async listCertificates(): Promise<Certificate[]> {
    const certificates = await this.prisma.certificate.findMany();
    return certificates;
  }

  async listCertificatesByUser(userId: string): Promise<Certificate[]> {
    const certificates = await this.prisma.certificate.findMany({
      where: {
        userId,
      },
    });
    return certificates;
  }

  async getById(certificateId: string): Promise<Certificate | void> {
    const certificate = await this.prisma.certificate.findUnique({
      where: {
        id: certificateId,
      },
    });
    return certificate;
  }
}
