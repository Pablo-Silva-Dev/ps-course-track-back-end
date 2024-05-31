import { Injectable } from "@nestjs/common";
import { UsersCoursesRepository } from "../../repositories/implementations/usersCoursesRepository";

@Injectable()
export class ListUsersCoursesByUserUseCase {
  constructor(private usersCoursesRepository: UsersCoursesRepository) {}
  async execute(userId: string) {
    const usersCourses = await this.usersCoursesRepository.listByUser(userId);
    return usersCourses;
  }
}
