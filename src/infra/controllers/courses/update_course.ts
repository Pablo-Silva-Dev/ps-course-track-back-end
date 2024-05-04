import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UpdateCourseUseCase } from "src/infra/useCases/courses/updateCourseUseCase";
import { z } from "zod";

const updateCourseBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().optional(),
  cover_url: z.string().optional(),
});

type UpdateCourseBodySchema = z.infer<typeof updateCourseBodySchema>;

@Controller("/courses")
@UseGuards(AuthGuard("jwt"))
export class UpdateCourseController {
  constructor(private updateCourseUseCase: UpdateCourseUseCase) {}
  @Put(":courseId")
  @HttpCode(203)
  async handle(
    @Param("courseId") courseId: string,
    @Body() body: UpdateCourseBodySchema
  ) {
    const { cover_url, description, name } = body;

    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    if (!name || !cover_url || !description) {
      throw new ConflictException(
        "'name', 'cover_url', 'description', and 'duration' are required fields"
      );
    }

    const updatedCourse = await this.updateCourseUseCase.execute(courseId, {
      name,
      cover_url,
      description,
    });

    return updatedCourse;
  }
}
