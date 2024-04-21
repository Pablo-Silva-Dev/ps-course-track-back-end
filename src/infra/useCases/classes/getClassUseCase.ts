import { Injectable, NotFoundException } from "@nestjs/common";
import { ClassesRepository } from "../../repositories/implementations/classesRepository";

@Injectable()
export class GetClassUseCase {
  constructor(private classesRepository: ClassesRepository) {}
  async execute(classId: string) {
    const foundClass = await this.classesRepository.getClassById(classId);
    if (!foundClass) {
      throw new NotFoundException("No class found for the provided classId");
    }
    return foundClass;
  }
}
