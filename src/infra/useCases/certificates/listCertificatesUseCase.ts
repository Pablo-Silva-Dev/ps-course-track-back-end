import { Injectable } from "@nestjs/common";
import { CertificatesRepository } from "../../repositories/implementations/certificatesRepository";

@Injectable()
export class ListCertificatesUseCase {
  constructor(private certificatesRepository: CertificatesRepository) {}
  async execute() {
    const certificates = await this.certificatesRepository.listCertificates();
    return certificates;
  }
}
