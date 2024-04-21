import { UserWatchedClasses } from "../../entities/UserWatchedClasses";
export interface IWatchedClassesRepository {
  watchClass(userId: string, classId: string): Promise<UserWatchedClasses>;
  fetchClass(
    userId: string,
    classId: string
  ): Promise<{ classWatched: boolean }>;
  unwatchClass(userId: string, classId: string): Promise<void>;
}
