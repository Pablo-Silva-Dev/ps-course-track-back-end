import { Course } from "./Course";
import { User } from "./User";

export interface Certificate {
  id?: string;
  userId: string;
  user?: User;
  courseId: string;
  course?: Course;
  certificate_url: string;
  concludedAt?: Date;
}
