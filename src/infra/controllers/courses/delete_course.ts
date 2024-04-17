import {
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  Param,
} from "@nestjs/common";
import { DeleteCourseUseCase } from "src/infra/useCases/courses/deleteCourseUseCase";

@Controller("/courses")
export class DeleteCourseController {
  constructor(private deleteCourseUseCase: DeleteCourseUseCase) {}
  @Delete(":courseId")
  @HttpCode(204)
  async handle(@Param("courseId") courseId: string) {
    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    await this.deleteCourseUseCase.execute(courseId);
  }
}
