import { Commentary } from "./Commentary";
import { Course } from "./Course";
import { UserCourse } from "./UserCourse";
import { UserCourseMetrics } from "./UserCourseMetrics";
import { UserWatchedClasses } from "./UserWatchedClasses";

export interface User {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  courses?: Course[];
  commentaries?: Commentary[];
  UserCourse?: UserCourse[];
  userMetrics?: UserCourseMetrics;
  watchedClasses?: UserWatchedClasses[];
}
