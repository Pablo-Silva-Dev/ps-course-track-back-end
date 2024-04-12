import { Injectable } from "@nestjs/common";
import { TutorsRepository } from "src/infra/repositories/implementations/tutorsRepository";

@Injectable()
export class ListTutorsUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}
  async execute() {
    const tutors = await this.tutorsRepository.listTutors();
    return tutors;
  }
}
