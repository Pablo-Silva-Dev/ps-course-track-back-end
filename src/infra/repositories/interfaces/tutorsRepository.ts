import { Tutor } from "../../entities/Tutor";

export interface ITutorsRepository {
  createTutor({ bio, name }: Tutor): Promise<Tutor>;
  listTutors(): Promise<Tutor[]>;
  getTutorById(id: string): Promise<Tutor | void>;
  getTutorByName(name: string): Promise<Tutor | void>;
  updateTutor(tutorId: string, data: { bio: string }): Promise<Tutor | void>;
  deleteTutor(tutorId: string): Promise<void>;
}
