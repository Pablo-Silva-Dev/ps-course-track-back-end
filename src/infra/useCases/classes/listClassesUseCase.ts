import { Injectable } from "@nestjs/common";
import { ClassesRepository } from "../../repositories/implementations/classesRepository";

@Injectable()
export class ListClassesUseCase {
  constructor(private classesRepository: ClassesRepository) {}
  async execute() {
    const classes = await this.classesRepository.listClasses();
    return classes;
  }
}
