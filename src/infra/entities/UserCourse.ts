import { Course } from "./Course";
import { User } from "./User";

export interface UserCourse {
  userId: string;
  courseId: string;
  user: User;
  course: Course;
}
