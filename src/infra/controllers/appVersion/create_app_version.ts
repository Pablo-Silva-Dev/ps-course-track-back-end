import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const createAppVersionBodySchema = z.object({
  appVersion: z.string(),
  availableOniOS: z.boolean(),
  availableOnAndroid: z.boolean(),
});

type CreateAppVersionBodySchema = z.infer<typeof createAppVersionBodySchema>;

@Controller("/appVersion")
export class CreateAppVersionController {
  constructor(private prisma: PrismaService) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAppVersionBodySchema) {
    const { availableOnAndroid, availableOniOS, appVersion } =
      createAppVersionBodySchema.parse(body);

    const MAX_APP_VERSION_RECORDS_ALLOWED = 1;

    const appVersionRecordsQuantity = await this.prisma.appVersion.count();

    if (
      !appVersion ||
      availableOniOS === undefined ||
      availableOnAndroid === undefined
    ) {
      throw new ConflictException(
        "'appVersion', 'availableOniOS', and 'availableOnAndroid' are required fields"
      );
    }

    if (appVersionRecordsQuantity >= MAX_APP_VERSION_RECORDS_ALLOWED) {
      throw new ConflictException(
        "There is an app version registered already. Consider to update it instead creating a new one."
      );
    }

    await this.prisma.appVersion.create({
      data: {
        appVersion,
        availableOnAndroid,
        availableOniOS,
      },
    });
  }
}
