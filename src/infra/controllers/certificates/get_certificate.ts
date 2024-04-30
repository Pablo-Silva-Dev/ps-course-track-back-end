import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { GetCertificateUseCase } from "src/infra/useCases/certificates/getCertificateUseCase";

@Controller("/certificates")
export class GetCertificateController {
  constructor(private getCertificateUseCase: GetCertificateUseCase) {}
  @Get(":certificateId")
  @HttpCode(200)
  async handle(@Param("certificateId") certificateId: string) {
    const certificate = await this.getCertificateUseCase.execute(certificateId);
    return certificate;
  }
}
