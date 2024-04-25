import { AppVersion } from "src/infra/entities/AppVersion";

export interface IAppVersionRepository {
  create(data: AppVersion): Promise<AppVersion | void>;
  getUnique(appVersionName: string): Promise<AppVersion | void>;
  list(): Promise<AppVersion[]>;
  update(appVersionId: string, data: AppVersion): Promise<AppVersion | void>;
}
