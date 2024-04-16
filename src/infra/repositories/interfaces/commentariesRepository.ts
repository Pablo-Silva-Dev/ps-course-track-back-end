import { Commentary } from "../../entities/Commentary";

export interface ICommentariesRepository {
  createCommentary({
    userId,
    courseId,
    classId,
    content,
  }: Commentary): Promise<Commentary>;
  listCommentaries(): Promise<Commentary[]>;
  listCommentariesByClass(classId: string): Promise<Commentary[]>;
  listCommentariesByUser(userId: string): Promise<Commentary[]>;
  getCommentary(commentaryId: string): Promise<Commentary | void>;
  updateCommentary(commentaryId: string, content: string): Promise<Commentary | void>;
  deleteCommentary(commentaryId: string): Promise<void>;
}
