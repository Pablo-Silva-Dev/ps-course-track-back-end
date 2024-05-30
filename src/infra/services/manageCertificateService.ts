import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createCanvas, loadImage, registerFont } from "canvas";
import * as fs from "fs";
import * as path from "path";
import { formatDateNow } from "src/utils/formatDate";
import { formatUserCertificateName } from "../../utils/formatUserCertificateName";
import { Course } from "../entities/Course";
import { User } from "../entities/User";
import { TEnv } from "../env";
import { AzureBlobStorageProvider } from "../providers/AzureBloStorageProvider";
import { formatSlug } from "./../../utils/formatSlug";

@Injectable()
export class ManageCertificateService {
  private certificatePath: string;
  constructor(
    private azureBlobStorageProvider: AzureBlobStorageProvider,
    private config: ConfigService<TEnv, true>
  ) {
    this.certificatePath = path.join(
      __dirname,
      "../../../src/infra/services/certificado.png"
    );
  }
  async generateCertificate(user: User, course: Course): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const fontBoldPoppinsPath = path.join(
        __dirname,
        "../../../src/assets/fonts/Poppins-Bold.ttf"
      );

      const fontMediumPoppinsPath = path.join(
        __dirname,
        "../../../src/assets/fonts/Poppins-Bold.ttf"
      );

      registerFont(fontBoldPoppinsPath, { family: "Poppins", weight: "bold" });
      registerFont(fontMediumPoppinsPath, {
        family: "Poppins",
        weight: "medium",
      });

      //create canvas
      const canvas = createCanvas(1920, 1080);
      const ctx = canvas.getContext("2d");

      //set certificate styles
      const gradientBackground = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
      );
      gradientBackground.addColorStop(0, "#211EB6");
      gradientBackground.addColorStop(1, "#111111");
      ctx.fillStyle = gradientBackground;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      //renders logo
      const logoPath = path.join(
        __dirname,
        "../../../src/assets/images/logo-certificate.png"
      );

      await loadImage(logoPath).then((image) => {
        ctx.drawImage(image, 80, 80, 96, 96);
      });

      //render certificate seal
      const certificateSealPath = path.join(
        __dirname,
        "../../../src/assets/images/seal-certificate.png"
      );

      await loadImage(certificateSealPath).then((image) => {
        ctx.drawImage(image, canvas.width - 320, canvas.height - 400, 240, 256);
      });

      //draws title
      const certificateTitle = "CERTIFICADO DE CONCLUSÃO";
      const certificateTitleTextMetrics = ctx.measureText(certificateTitle);
      const certificateTitlePositionX =
        (canvas.width - certificateTitleTextMetrics.width) / 1.9;
      ctx.font = "56px Poppins";
      ctx.fillStyle = "#FF5F05";
      ctx.textAlign = "center";
      ctx.fillText(certificateTitle, certificateTitlePositionX, 160);

      //draws alum name
      ctx.font = "80px Poppins";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "left";
      ctx.fillText(formatUserCertificateName(user.name), 200, 360);

      //draws conclusion text
      const conclusionTextPt1 = `concluiu o curso ${course.name} com duração total de ${course.duration} horas`;
      const conclusionTextPt2 = `na data de ${formatDateNow()} reconhecido pela plataforma de cursos online.`;
      ctx.font = "28px Verdana";
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "left";
      ctx.fillText(conclusionTextPt1, 200, 440);
      ctx.fillText(conclusionTextPt2, 200, 480);

      //draws hassh title text
      const hashTitle = "Hash de identificação:";
      ctx.font = "24px Verdana";
      ctx.fillText(hashTitle, 200, 880);
      //draws hassh text
      const hashText = course.id + user.id;
      ctx.font = "24px Verdana";
      ctx.fillText(hashText, 200, 920);

      //draws footer rect
      ctx.fillStyle = "#FF5F05";
      ctx.fillRect(0, canvas.height - 24, canvas.width, 24);

      // Save as PNG
      const fileStream = fs.createWriteStream(this.certificatePath);
      const stream = canvas.createPNGStream();
      stream.pipe(fileStream);
      fileStream.on("finish", () => {
        console.log(
          "The certificate has been created successfully at:",
          this.certificatePath
        );
        resolve(this.certificatePath);
      });
      fileStream.on("error", reject);
    });
  }

  async uploadGeneratedCertificate(
    certificatePath: string,
    courseName: string,
    userName: string
  ) {
    const blobStorageContainerName = this.config.get(
      "AZURE_BLOB_STORAGE_CONTAINER_NAME",
      { infer: true }
    );
    const blobClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(blobStorageContainerName)
      .getBlockBlobClient(
        `${formatSlug(courseName + "-" + userName)}-certificado.png`
      );
    const certificate = fs.readFileSync(certificatePath);
    await blobClient.uploadData(certificate);
    fs.unlink(this.certificatePath, () =>
      console.log("Temporary certificate file removed")
    );
    return blobClient.url;
  }
}
