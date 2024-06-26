import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  PORT: z.coerce.number().optional().default(3333),
  AZURE_BLOB_STORAGE_CONNECTION_STRING: z.string(),
  AZURE_BLOB_STORAGE_VIDEO_CLASSES_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_COURSES_COVERS_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_MODULES_COVERS_CONTAINER_NAME: z.string(),
  AZURE_BLOB_STORAGE_CERTIFICATES_CONTAINER_NAME: z.string(),
});

export type TEnv = z.infer<typeof envSchema>;
