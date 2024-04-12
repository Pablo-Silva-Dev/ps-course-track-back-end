import { ConflictException, Injectable } from "@nestjs/common";
import { TutorsRepository } from "src/infra/repositories/implementations/tutorsRepository";
import { Tutor } from "../../entities/Tutor";

@Injectable()
export class CreateTutorUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}
  async execute({ name, bio }: Tutor) {
    const tutorAlreadyExists = await this.tutorsRepository.getTutorByName(name);

    if (tutorAlreadyExists) {
      throw new ConflictException("A tutor with provided name already exists.");
    }

    await this.tutorsRepository.createTutor({ name, bio });
  }
}
