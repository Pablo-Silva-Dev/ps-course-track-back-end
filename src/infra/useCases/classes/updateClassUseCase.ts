import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { Class } from "src/infra/entities/Class";
import { ClassesRepository } from "src/infra/repositories/implementations/classesRepository";

@Injectable()
export class UpdateClassUseCase {
  constructor(private classesRepository: ClassesRepository) {}
  async execute(classId: string, { url, description, name }: Class) {
    const foundClass = (await this.classesRepository.getClassById(
      classId
    )) as Class;

    if (foundClass?.name === name) {
      throw new ConflictException(
        "There is already a class with the provided name. Please try another one."
      );
    }

    if (!foundClass) {
      throw new NotFoundException("Not found a class for the provided classId");
    }
    const updatedClass = await this.classesRepository.updateClass(classId, {
      description,
      url,
      name,
    });
    return updatedClass;
  }
}
