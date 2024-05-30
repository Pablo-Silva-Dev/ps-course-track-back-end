import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CertificatesRepository } from "src/infra/repositories/implementations/certificatesRepository";
import { ManageCertificateService } from "src/infra/services/manageCertificateService";
import { CreateCertificateUseCase } from "src/infra/useCases/certificates/createCertificateUseCase";
import { GetCourseUseCase } from "src/infra/useCases/courses/getCourseUseCase";
import { GetUserUseCase } from "src/infra/useCases/users/getUserUseCase";
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
  constructor(
    private manageCertificateService: ManageCertificateService,
    private createCertificateUseCase: CreateCertificateUseCase,
    private getUserUseCase: GetUserUseCase,
    private getCourseUseCase: GetCourseUseCase,
    private certificatesRepository: CertificatesRepository
  ) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: createCertificateBody) {
    const { courseId, userId } = createCertificateBodySchema.parse(body);

    if (!userId) {
      throw new ConflictException("userId is required");
    }
    if (!courseId) {
      throw new ConflictException("courseId is required");
    }

    const user = await this.getUserUseCase.execute(userId);
    const course = await this.getCourseUseCase.execute(courseId);

    if (!user) {
      throw new NotFoundException("Not found an user for the provided userId");
    }

    if (!course) {
      throw new NotFoundException(
        "Not found an course for the provided courseId"
      );
    }

    const certificateAlreadyExists =
      await this.certificatesRepository.checkIfCertificateExists(
        userId,
        courseId
      );

    if (certificateAlreadyExists) {
      throw new ConflictException(
        "Already exists a certificate for this user related to this course."
      );
    }

    if (!certificateAlreadyExists) {
      const certificate =
        await this.manageCertificateService.generateCertificate(
          user,
          course as never
        );
      const uploadedCertificate =
        await this.manageCertificateService.uploadGeneratedCertificate(
          certificate,
          course.name,
          user.name
        );

      const createdCertificate = await this.createCertificateUseCase.execute({
        courseId,
        userId,
        certificate_url: uploadedCertificate,
      });
      return createdCertificate;
    }
  }
}
