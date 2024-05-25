import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEnv } from "../env";
import { AzureBlobStorageProvider } from "../providers/AzureBloStorageProvider";

@Injectable()
export class UploadFileService {
  constructor(
    private azureBlobStorageProvider: AzureBlobStorageProvider,
    private config: ConfigService<TEnv, true>
  ) {}

  async uploadFile(fileBuffer: Buffer, fileName: string) {
    const blobStorageContainerName = this.config.get(
      "AZURE_BLOB_STORAGE_CONTAINER_NAME",
      { infer: true }
    );
    const blobClient = this.azureBlobStorageProvider
      .getBlobServiceClient()
      .getContainerClient(blobStorageContainerName)
      .getBlockBlobClient(fileName);
    await blobClient.uploadData(fileBuffer);
    return blobClient.url;
  }
}
