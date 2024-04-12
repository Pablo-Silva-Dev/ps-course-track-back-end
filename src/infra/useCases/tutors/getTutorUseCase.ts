import { Injectable, NotFoundException } from "@nestjs/common";
import { TutorsRepository } from "../../repositories/implementations/tutorsRepository";

@Injectable()
export class GetTutorUseCase {
  constructor(private tutorsRepository: TutorsRepository) {}
  async execute(tutorId: string) {
    const tutor = await this.tutorsRepository.getTutorById(tutorId);
    if (!tutor) {
      throw new NotFoundException("No tutor found for the provided tutorId");
    }
    return tutor;
  }
}
