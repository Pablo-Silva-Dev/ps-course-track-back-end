import { Controller, Get, HttpCode, Param } from "@nestjs/common";
import { ListCertificatesByUserUseCase } from "src/infra/useCases/certificates/listCertificatesByUserUseCase";

@Controller("/certificates/list-by-user")
export class ListCertificatesByUserController {
  constructor(
    private listCertificatesByUserUseCase: ListCertificatesByUserUseCase
  ) {}
  @Get(":userId")
  @HttpCode(200)
  async handle(@Param("userId") userId: string) {
    const certificates =
      await this.listCertificatesByUserUseCase.execute(userId);
    return certificates;
  }
}
