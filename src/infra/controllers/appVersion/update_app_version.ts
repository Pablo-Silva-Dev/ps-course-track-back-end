import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  NotFoundException,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const updateAppVersionBodySchema = z.object({
  appVersion: z.string(),
  availableOniOS: z.boolean(),
  availableOnAndroid: z.boolean(),
});

type UpdateAppVersionBodySchema = z.infer<typeof updateAppVersionBodySchema>;

@Controller("/appVersion")
export class UpdateAppVersionController {
  constructor(private prisma: PrismaService) {}
  @Put()
  @HttpCode(203)
  async handle(@Body() body: UpdateAppVersionBodySchema) {
    const { appVersion, availableOnAndroid, availableOniOS } = body;

    if (
      !appVersion ||
      availableOnAndroid === undefined ||
      availableOnAndroid === null ||
      availableOniOS === undefined ||
      availableOniOS === null
    ) {
      throw new ConflictException(
        "'appVersion', 'availableOniOS', and  'availableOnAndroid' fields are required"
      );
    }

    const registeredAppVersion = await this.prisma.appVersion.findFirst();

    if (!registeredAppVersion) {
      throw new NotFoundException(
        "There is not an app version registered. Try to register an app version."
      );
    }

    await this.prisma.appVersion.update({
      where: {
        id: registeredAppVersion.id,
      },
      data: {
        appVersion,
        availableOnAndroid,
        availableOniOS,
      },
    });
  }
}
