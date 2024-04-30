import { Certificate } from "src/infra/entities/Certificate";

export interface ICertificatesRepository {
  create(data: ICreateCertificateDTO): Promise<Certificate>;
  checkIfCertificateExists(userId: string, courseId: string): Promise<boolean>;
  listCertificates(): Promise<Certificate[]>;
  listCertificatesByUser(userId: string): Promise<Certificate[]>;
  getById(certificateId: string): Promise<Certificate | void>;
}
