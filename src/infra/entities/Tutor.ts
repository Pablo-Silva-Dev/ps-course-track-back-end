import { Class } from "./Class";

export interface Tutor {
  id: string;
  name: string;
  bio: string;
  classes?: Class[];
}
