import {
  ICheckUserCourseDTO,
  ICreateUserCourseDTO,
} from "src/infra/dtos/UserCourseDTO";

export interface IUsersCoursesRepository {
  create(data: ICreateUserCourseDTO): Promise<ICreateUserCourseDTO>;
  checkRecordAlreadyExists(data: ICheckUserCourseDTO): Promise<boolean>;
  list(): Promise<ICreateUserCourseDTO[]>;
  listByUser(userId: string): Promise<ICreateUserCourseDTO[]>;
}
