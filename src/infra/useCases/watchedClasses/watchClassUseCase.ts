import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ClassesRepository } from "src/infra/repositories/implementations/classesRepository";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { WatchedClassesRepository } from "src/infra/repositories/implementations/watchedClassesRepository";

@Injectable()
export class WatchClassUseCase {
  constructor(
    private watchedClassesRepository: WatchedClassesRepository,
    private usersRepository: UsersRepository,
    private classesRepository: ClassesRepository
  ) {}
  async execute(userId: string, classId: string) {
    const user = await this.usersRepository.getUserById(userId);

    const existingClass = await this.classesRepository.getClassById(classId);

    const watchedClass = await this.watchedClassesRepository.fetchClass(
      userId,
      classId
    );

    if (!user) {
      throw new NotFoundException("Not found an user for the provided userId.");
    }

    if (!existingClass) {
      throw new NotFoundException(
        "Not found a class for the provided classId."
      );
    }

    if (watchedClass.classWatched) {
      throw new ConflictException("Class was watched already.");
    }

    const registerWatchedClasses =
      await this.watchedClassesRepository.watchClass(userId, classId);
    return registerWatchedClasses;
  }
}
