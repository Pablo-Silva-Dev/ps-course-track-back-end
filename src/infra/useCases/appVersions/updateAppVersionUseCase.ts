import { Injectable, NotFoundException } from "@nestjs/common";
import { IUpdateAppVersionDTO } from "src/infra/dtos/AppVersionDTO";
import { AppVersionsRepository } from "src/infra/repositories/implementations/appVersionsRepository";

@Injectable()
export class UpdateAppVersionUseCase {
  constructor(private appVersionsRepository: AppVersionsRepository) {}
  async execute(appVersionId: string, data: IUpdateAppVersionDTO) {
    const existingAppVersion =
      await this.appVersionsRepository.getUniqueById(appVersionId);

    if (!existingAppVersion) {
      throw new NotFoundException(
        "Not found an app version for the specified appVersionId"
      );
    }

    const updatedAppVersion = await this.appVersionsRepository.update(
      appVersionId,
      data
    );
    return updatedAppVersion;
  }
}
