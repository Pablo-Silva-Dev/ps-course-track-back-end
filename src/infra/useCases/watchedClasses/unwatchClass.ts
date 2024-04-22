import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ClassesRepository } from "src/infra/repositories/implementations/classesRepository";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { WatchedClassesRepository } from "src/infra/repositories/implementations/watchedClassesRepository";

@Injectable()
export class UnwatchClassUseCase {
  constructor(
    private watchedClassesRepository: WatchedClassesRepository,
    private usersRepository: UsersRepository,
    private classesRepository: ClassesRepository
  ) {}
  async execute(userId: string, classId: string) {
    const user = await this.usersRepository.getUserById(userId);

    const existingClass = await this.classesRepository.getClassById(classId);

    const classWasUnwatchedAlready =
      await this.watchedClassesRepository.fetchClass(userId, classId);

    if (!classWasUnwatchedAlready.classWatched) {
      throw new ConflictException("This class was marked as unwatched already");
    }

    if (!user) {
      throw new NotFoundException("Not found an user for the provided userId.");
    }

    if (!existingClass) {
      throw new NotFoundException(
        "Not found a class for the provided classId."
      );
    }

    await this.watchedClassesRepository.unwatchClass(userId, classId);
  }
}
