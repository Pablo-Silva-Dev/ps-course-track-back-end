import { Course } from "./Course";
import { User } from "./User";

export interface UserCourseMetrics {
  id?: string;
  userId: string;
  user?: User;
  courseId: string;
  course?: Course;
  courseTotalClasses: number;
  totalWatchedClasses: number;
  totalWatchedClassesPercentage: number;
}
