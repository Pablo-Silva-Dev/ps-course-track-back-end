interface ICreateCertificateDTO {
  id?: string;
  userId: string;
  courseId: string;
  certificate_url: string;
  concludedAt?: Date;
}
