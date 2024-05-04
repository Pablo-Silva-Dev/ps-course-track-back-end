import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateTutorUseCase } from "src/infra/useCases/tutors/createTutorUseCase";
import { z } from "zod";

const createTutorBodySchema = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
});

type CreateTutorBodySchema = z.infer<typeof createTutorBodySchema>;

@Controller("/tutors")
@UseGuards(AuthGuard("jwt"))
export class CreateTutorController {
  constructor(private createTutorUseCase: CreateTutorUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateTutorBodySchema) {
    const isBodyValidated = createTutorBodySchema.safeParse(body);
    const { name, bio } = createTutorBodySchema.parse(body);

    if (!name) {
      throw new ConflictException("Name is required.");
    }

    if (!bio) {
      throw new ConflictException("Bio is required.");
    }

    if (!isBodyValidated) {
      throw new ConflictException(
        "Invalid request body. Check if all fields are informed."
      );
    }

    const tutor = await this.createTutorUseCase.execute({ name, bio });
    return tutor;
  }
}
