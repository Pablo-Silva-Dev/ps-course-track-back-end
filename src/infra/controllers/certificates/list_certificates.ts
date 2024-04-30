import { Controller, Get, HttpCode } from "@nestjs/common";
import { ListCertificatesUseCase } from "src/infra/useCases/certificates/listCertificatesUseCase";

@Controller("/certificates/list")
export class ListCertificatesController {
  constructor(private listCertificatesUseCase: ListCertificatesUseCase) {}
  @Get()
  @HttpCode(200)
  async handle() {
    const certificates = await this.listCertificatesUseCase.execute();
    return certificates;
  }
}
