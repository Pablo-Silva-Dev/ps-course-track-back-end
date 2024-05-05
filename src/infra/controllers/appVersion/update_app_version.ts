import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UpdateAppVersionUseCase } from "src/infra/useCases/appVersions/updateAppVersionUseCase";
import { z } from "zod";

const updateAppVersionBodySchema = z.object({
  availableOniOS: z.boolean().optional(),
  availableOnAndroid: z.boolean().optional(),
});

type UpdateAppVersionBodySchema = z.infer<typeof updateAppVersionBodySchema>;

@Controller("/appVersion")
@UseGuards(AuthGuard("jwt-admin"))
export class UpdateAppVersionController {
  constructor(private updateAppVersionUseCase: UpdateAppVersionUseCase) {}
  @Put(":appVersionId")
  @HttpCode(203)
  async handle(
    @Body() body: UpdateAppVersionBodySchema,
    @Param("appVersionId") appVersionId: string
  ) {
    const { availableOnAndroid, availableOniOS } = body;

    if (
      availableOnAndroid === undefined ||
      availableOnAndroid === null ||
      availableOniOS === undefined ||
      availableOniOS === null
    ) {
      throw new ConflictException(
        "'appVersion', 'availableOniOS', and  'availableOnAndroid' fields are required"
      );
    }

    const updatedAppVersion = await this.updateAppVersionUseCase.execute(
      appVersionId,
      { availableOnAndroid, availableOniOS }
    );

    return updatedAppVersion;
  }
}
