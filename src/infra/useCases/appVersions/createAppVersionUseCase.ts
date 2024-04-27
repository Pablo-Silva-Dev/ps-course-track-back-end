import { ConflictException, Injectable } from "@nestjs/common";
import { AppVersionsRepository } from "src/infra/repositories/implementations/appVersionsRepository";
import { AppVersion } from "../../entities/AppVersion";

@Injectable()
export class CreateAppVersionUseCase {
  constructor(private appVersionsRepository: AppVersionsRepository) {}
  async execute(data: AppVersion) {
    const { appVersion } = data;

    const appVersionAlreadyExists =
      await this.appVersionsRepository.getUniqueByVersionName(appVersion);

    if (appVersionAlreadyExists) {
      throw new ConflictException(
        `App already exists an version for ${appVersion}`
      );
    }

    const createdAppVersion = await this.appVersionsRepository.create(data);
    return createdAppVersion;
  }
}
