import { User } from "@prisma/client";
import { Class } from "./Class";
import { Commentary } from "./Commentary";
import { Module } from "./Module";
import { UserCourse } from "./UserCourse";
import { UserCourseMetrics } from "./UserCourseMetrics";

export interface Course {
  id?: string;
  name: string;
  description: string;
  duration?: number;
  cover_url: string;
  users?: User[];
  modules?: Module[];
  commentaries?: Commentary[];
  UserCourse?: UserCourse[];
  classes?: Class[];
  userMetrics?: UserCourseMetrics;
}
