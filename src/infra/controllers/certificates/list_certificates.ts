import { Controller, Get, HttpCode, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListCertificatesUseCase } from "src/infra/useCases/certificates/listCertificatesUseCase";

@Controller("/certificates/list")
@UseGuards(AuthGuard("jwt"))
export class ListCertificatesController {
  constructor(private listCertificatesUseCase: ListCertificatesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const certificates = await this.listCertificatesUseCase.execute();
    return certificates;
  }
}
