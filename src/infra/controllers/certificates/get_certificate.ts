import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetCertificateUseCase } from "src/infra/useCases/certificates/getCertificateUseCase";

@Controller("/certificates")
@UseGuards(AuthGuard("jwt"))
export class GetCertificateController {
  constructor(private getCertificateUseCase: GetCertificateUseCase) {}
  @Get(":certificateId")
  @HttpCode(200)
  async handle(@Param("certificateId") certificateId: string) {
    const certificate = await this.getCertificateUseCase.execute(certificateId);
    return certificate;
  }
}
