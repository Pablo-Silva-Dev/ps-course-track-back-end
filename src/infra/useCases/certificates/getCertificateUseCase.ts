import { Injectable, NotFoundException } from "@nestjs/common";
import { CertificatesRepository } from "../../repositories/implementations/certificatesRepository";

@Injectable()
export class GetCertificateUseCase {
  constructor(private certificatesRepository: CertificatesRepository) {}
  async execute(certificateId: string) {
    const certificate =
      await this.certificatesRepository.getById(certificateId);

    if (!certificate) {
      throw new NotFoundException(
        "Not found a certificate for the provided certificateId"
      );
    }

    return certificate;
  }
}
