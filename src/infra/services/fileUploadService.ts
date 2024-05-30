import { Injectable } from "@nestjs/common";
import { AzureBlobStorageProvider } from "../providers/AzureBloStorageProvider";

@Injectable()
export class UploadFileService {
  constructor(private azureBlobStorageProvider: AzureBlobStorageProvider) {}

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    containerName: string
  ) {
    const blobClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(containerName)
      .getBlockBlobClient(fileName);
    await blobClient.uploadData(fileBuffer);
    return blobClient.url;
  }
}
