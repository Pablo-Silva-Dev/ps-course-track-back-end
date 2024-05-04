import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateCommentaryUseCase } from "src/infra/useCases/commentaries/createCommentaryUseCase";
import { z } from "zod";

const createCommentaryBodySchema = z.object({
  content: z.string().optional(),
  userId: z.string().optional(),
  classId: z.string().optional(),
  courseId: z.string().optional(),
});

type CreateCommentaryBodySchema = z.infer<typeof createCommentaryBodySchema>;

@Controller("/commentaries")
@UseGuards(AuthGuard("jwt"))
export class CreateCommentaryController {
  constructor(private createCommentaryUseCase: CreateCommentaryUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateCommentaryBodySchema) {
    const { content, classId, userId, courseId } =
      createCommentaryBodySchema.parse(body);

    const isBodyValidated = createCommentaryBodySchema.safeParse(body);

    if (!content) {
      throw new ConflictException("content is required");
    }
    if (!classId) {
      throw new ConflictException("classId is required");
    }
    if (!userId) {
      throw new ConflictException("userId is required");
    }
    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    if (!isBodyValidated) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    const commentary = await this.createCommentaryUseCase.execute({
      userId,
      courseId,
      classId,
      content,
    });

    return commentary;
  }
}
