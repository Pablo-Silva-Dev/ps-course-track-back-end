import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CoursesRepository } from "src/infra/repositories/implementations/coursesRepository";
import { UsersRepository } from "src/infra/repositories/implementations/usersRepository";
import { CertificatesRepository } from "../../repositories/implementations/certificatesRepository";

@Injectable()
export class CreateCertificateUseCase {
  constructor(
    private certificatesRepository: CertificatesRepository,
    private usersRepository: UsersRepository,
    private coursesRepository: CoursesRepository
  ) {}
  async execute(data: ICreateCertificateDTO) {
    const { userId, courseId } = data;

    const user = await this.usersRepository.getUserById(userId);

    const course = await this.coursesRepository.getCourseById(courseId);

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

    const createdCertificate = await this.certificatesRepository.create(data);
    return createdCertificate;
  }
}
