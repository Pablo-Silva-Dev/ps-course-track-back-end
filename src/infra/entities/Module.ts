import { Class } from "./Class";
import { Course } from "./Course";

export interface Module {
  id?: string;
  name: string;
  description: string;
  duration?: number;
  cover_url?: string;
  courseId?: string;
  course?: Course;
  classes?: Class[];
}
