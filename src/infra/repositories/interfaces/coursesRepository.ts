import { Course } from "../../entities/Course";

export interface ICoursesRepository {
  createCourse(data: Course): Promise<Course>;
  listCourses(): Promise<Course[]>;
  getCourseById(courseId: string): Promise<Course | void>;
  getCourseByName(courseName: string): Promise<Course | void>;
  updateCourse(
    courseId: string,
    { description, cover_url }: Course
  ): Promise<Course | void>;
  deleteCourse(courseId: string): Promise<void>;
}
