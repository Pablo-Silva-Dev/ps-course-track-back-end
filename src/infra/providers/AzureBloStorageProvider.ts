import { BlobServiceClient } from "@azure/storage-blob";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TEnv } from "../env";

@Injectable()
export class AzureBlobStorageProvider {
  private blobServiceClient: BlobServiceClient;
  constructor(private config: ConfigService<TEnv, true>) {
    const connectionString = this.config.get(
      "AZURE_BLOB_STORAGE_CONNECTION_STRING",
      { infer: true }
    );
    if (!connectionString) {
      throw new Error(
        "Azure Blob Storage connection string is not configured."
      );
    }
    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
  }

  getBlobServiceClient(): BlobServiceClient {
    return this.blobServiceClient;
  }
}
