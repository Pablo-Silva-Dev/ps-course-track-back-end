import { Injectable, NotFoundException } from "@nestjs/common";
import { ICreateCommentaryDTO } from "src/infra/dtos/CommentaryDTO";
import { ClassesRepository } from "src/infra/repositories/implementations/classesRepository";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { CommentariesRepository } from "../../repositories/implementations/commentariesRepository";

@Injectable()
export class CreateCommentaryUseCase {
  constructor(
    private commentariesRepository: CommentariesRepository,
    private usersRepository: UsersRepository,
    private classesRepositories: ClassesRepository,
    private coursesRepository: CoursesRepository
  ) {}
  async execute(commentaryData: ICreateCommentaryDTO) {
    const { userId, classId, courseId } = commentaryData;

    const user = await this.usersRepository.getUserById(userId);
    const classExists = await this.classesRepositories.getClassById(classId);
    const course = await this.coursesRepository.getCourseById(courseId);

    if (!user) {
      throw new NotFoundException("There is no user for the provided userId");
    }

    if (!classExists) {
      throw new NotFoundException("There is no class for the provided classId");
    }
    if (!course) {
      throw new NotFoundException(
        "There is no course for the provided courseId"
      );
    }

    const commentary =
      await this.commentariesRepository.createCommentary(commentaryData);
    return commentary;
  }
}
