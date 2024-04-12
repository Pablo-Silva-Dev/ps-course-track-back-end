import { ConflictException, Injectable } from "@nestjs/common";
import { TutorsRepository } from "src/infra/repositories/implementations/tutorsRepository";

@Injectable()
export class DeleteTutorUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}
  async execute(tutorId) {
    const tutor = await this.tutorsRepository.getTutorById(tutorId);
    if (!tutor) {
      throw new ConflictException(
        "Not found a tutor for the provided tutorId."
      );
    }
    await this.tutorsRepository.deleteTutor(tutorId);
  }
}
