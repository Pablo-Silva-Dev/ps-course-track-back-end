import { Injectable, NotFoundException } from "@nestjs/common";
import { TutorsRepository } from "../../repositories/implementations/tutorsRepository";

@Injectable()
export class UpdateTutorUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}
  async execute(tutorId: string, data: { bio: string }) {
    const tutor = await this.tutorsRepository.getTutorById(tutorId);
    if (!tutor) {
      throw new NotFoundException(
        "Not found a tutor with the provided tutorId."
      );
    }

    const updatedTutor = await this.tutorsRepository.updateTutor(tutorId, data);
    return updatedTutor;
  }
}
