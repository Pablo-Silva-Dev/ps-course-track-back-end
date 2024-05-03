import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateCertificateUseCase } from "src/infra/useCases/certificates/createCertificateUseCase";
import { z } from "zod";

const createCertificateBodySchema = z.object({
  userId: z.string().optional(),
  courseId: z.string().optional(),
  certificate_url: z.string().optional(),
});

type createCertificateBody = z.infer<typeof createCertificateBodySchema>;

@Controller("/certificates")
@UseGuards(AuthGuard("jwt"))
export class CreateCertificateController {
  constructor(private createCertificateUseCase: CreateCertificateUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: createCertificateBody) {
    const { certificate_url, courseId, userId } =
      createCertificateBodySchema.parse(body);

    if (!userId) {
      throw new ConflictException("userId is required");
    }
    if (!courseId) {
      throw new ConflictException("courseId is required");
    }
    if (!certificate_url) {
      throw new ConflictException("certificate_url is required");
    }

    const createdCertificate = await this.createCertificateUseCase.execute({
      certificate_url,
      courseId,
      userId,
    });

    return createdCertificate;
  }
}
