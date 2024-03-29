import { Class } from "./Class";
import { Course } from "./Course";
import { User } from "./User";

export interface Commentary {
  id: string;
  content: string;
  userId: string;
  user: User;
  classId: string;
  class: Class;
  courseId: string;
  course: Course;
}
