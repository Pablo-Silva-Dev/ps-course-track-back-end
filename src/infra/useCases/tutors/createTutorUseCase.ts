import { Injectable } from "@nestjs/common";
import { TutorsRepository } from "src/infra/repositories/implementations/tutorsRepository";
import { Tutor } from "../../entities/Tutor";

@Injectable()
export class CreateTutorUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}
  async execute({ name, bio }: Tutor) {
    const createdTutor = await this.tutorsRepository.createTutor({ name, bio });
    return createdTutor;
  }
}
