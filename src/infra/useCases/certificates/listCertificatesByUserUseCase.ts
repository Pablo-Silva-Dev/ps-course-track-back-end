import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { CertificatesRepository } from "../../repositories/implementations/certificatesRepository";

@Injectable()
export class ListCertificatesByUserUseCase {
  constructor(
    private certificatesRepository: CertificatesRepository,
    private usersRepository: UsersRepository
  ) {}
  async execute(userId: string) {
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException("Not found an user for the provided userId");
    }

    const certificates =
      await this.certificatesRepository.listCertificatesByUser(userId);
    return certificates;
  }
}
