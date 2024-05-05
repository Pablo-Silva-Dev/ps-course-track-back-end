import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { z } from "zod";
import { CreateAppVersionUseCase } from "./../../useCases/appVersions/createAppVersionUseCase";

const createAppVersionBodySchema = z.object({
  appVersion: z.string().optional(),
  availableOniOS: z.boolean().optional(),
  availableOnAndroid: z.boolean().optional(),
});

type CreateAppVersionBodySchema = z.infer<typeof createAppVersionBodySchema>;

@Controller("/appVersion")
@UseGuards(AuthGuard("jwt-admin"))
export class CreateAppVersionController {
  constructor(private createAppVersionUseCase: CreateAppVersionUseCase) {}
  @Post()
  @HttpCode(201)
  async handle(@Body() body: CreateAppVersionBodySchema) {
    const { availableOnAndroid, availableOniOS, appVersion } =
      createAppVersionBodySchema.parse(body);

    if (!appVersion) {
      throw new ConflictException("appVersion is required.");
    }
    if (availableOnAndroid === undefined) {
      throw new ConflictException("availableOnAndroid is required.");
    }

    if (availableOnAndroid === undefined) {
      throw new ConflictException("availableOniOS is required.");
    }

    const createdVersion = await this.createAppVersionUseCase.execute({
      appVersion,
      availableOnAndroid,
      availableOniOS,
    });

    return createdVersion;
  }
}
