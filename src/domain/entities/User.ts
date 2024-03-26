import { Commentary } from "./Commentary";
import { Course } from "./Course";
import { UserCourse } from "./UserCourse";
import { UserMetrics } from "./UserMetrics";
import { UserWatchedClasses } from "./UserWatchedClasses";

export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  courses?: Course[];
  commentaries?: Commentary[];
  UserCourse?: UserCourse[];
  userMetrics?: UserMetrics;
  watchedClasses?: UserWatchedClasses[];
}
