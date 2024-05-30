import { Injectable } from "@nestjs/common";
import { CertificatesRepository } from "../../repositories/implementations/certificatesRepository";

@Injectable()
export class CreateCertificateUseCase {
  constructor(private certificatesRepository: CertificatesRepository) {}
  async execute(data: ICreateCertificateDTO) {
    const createdCertificate = await this.certificatesRepository.create(data);
    return createdCertificate;
  }
}
