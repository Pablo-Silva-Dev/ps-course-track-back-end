import { Injectable, NotFoundException } from "@nestjs/common";
import { TutorsRepository } from "../../repositories/implementations/tutorsRepository";

@Injectable()
export class UpdateTutorUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}
  async execute(tutorId: string, bio: string) {
    const tutor = await this.tutorsRepository.getTutorById(tutorId);
    if (!tutor) {
      throw new NotFoundException(
        "Not found a tutor for the provided tutorId."
      );
    }

    const updatedTutor = await this.tutorsRepository.updateTutor(tutorId, bio);
    return updatedTutor;
  }
}
