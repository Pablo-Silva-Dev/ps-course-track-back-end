import { Injectable } from "@nestjs/common";
import { UsersCoursesRepository } from "../../repositories/implementations/usersCoursesRepository";

@Injectable()
export class ListUsersCoursesUseCase {
  constructor(private usersCoursesRepository: UsersCoursesRepository) {}
  async execute() {
    const usersCourses = await this.usersCoursesRepository.list();
    return usersCourses;
  }
}
