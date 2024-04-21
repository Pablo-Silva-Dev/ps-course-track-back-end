import { Injectable, NotFoundException } from "@nestjs/common";
import { ClassesRepository } from "src/infra/repositories/implementations/classesRepository";

@Injectable()
export class DeleteClassUseCase {
  constructor(private classesRepository: ClassesRepository) {}
  async execute(classId: string) {
    const foundClass = await this.classesRepository.getClassById(classId);
    if (!foundClass) {
      throw new NotFoundException("Not found a class for the provided classId");
    }
    await this.classesRepository.deleteClass(classId);
  }
}
