import { IUpdateAppVersionDTO } from "src/infra/dtos/AppVersionDTO";
import { AppVersion } from "src/infra/entities/AppVersion";

export interface IAppVersionRepository {
  create(data: AppVersion): Promise<AppVersion | void>;
  getUniqueByVersionName(appVersionName: string): Promise<AppVersion | void>;
  getUniqueById(appVersionId: string): Promise<AppVersion | void>;
  list(): Promise<AppVersion[]>;
  update(
    appVersionId: string,
    data: IUpdateAppVersionDTO
  ): Promise<AppVersion | void>;
}
