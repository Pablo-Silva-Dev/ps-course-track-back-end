import { Class } from "../../entities/Class";

export interface IClassesRepository {
  createClass(data: Class): Promise<Class>;
  listClasses(): Promise<Class[]>;
  listClassesByModule(moduleId): Promise<Class[]>;
  getClassById(classId: string): Promise<Class | void>;
  updateClass(
    courseId: string,
    { description, name }: Class
  ): Promise<Class | void>;
  deleteClass(courseId: string): Promise<void>;
}
