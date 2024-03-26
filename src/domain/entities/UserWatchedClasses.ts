import { Class } from "./Class";
import { User } from "./User";

export interface UserWatchedClasses {
  userId: string;
  classId: string;
  watchedAt: Date;
  user: User;
  class: Class;
}
