import { Injectable } from "@nestjs/common";
import { AppVersionsRepository } from "src/infra/repositories/implementations/appVersionsRepository";

@Injectable()
export class ListAppVersionsUseCase {
  constructor(private appVersionsRepository: AppVersionsRepository) {}
  async execute() {
    const appVersions = await this.appVersionsRepository.list();
    return appVersions;
  }
}
