import { Commentary } from "./Commentary";
import { Course } from "./Course";
import { Module } from "./Module";
import { Tutor } from "./Tutor";
import { UserWatchedClasses } from "./UserWatchedClasses";

export interface Class {
  id: string;
  name: string;
  description: string;
  duration: number;
  url: string;
  moduleId: string;
  module: Module;
  tutorId: string;
  tutor: Tutor;
  courseId: string;
  course: Course;
  commentaries: Commentary[];
  watchedByUsers: UserWatchedClasses[];
}
