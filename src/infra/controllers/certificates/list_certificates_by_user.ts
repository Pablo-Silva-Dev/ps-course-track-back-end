import { Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ListCertificatesByUserUseCase } from "src/infra/useCases/certificates/listCertificatesByUserUseCase";

@Controller("/certificates/list-by-user")
@UseGuards(AuthGuard("jwt"))
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
