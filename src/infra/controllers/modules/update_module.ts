import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Param,
  Put,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const updateModuleBodySchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  duration: z.number().optional(),
  cover_url: z.string().optional(),
});

type UpdateModuleBodySchema = z.infer<typeof updateModuleBodySchema>;

@Controller("/modules")
export class UpdateModuleController {
  constructor(private prisma: PrismaService) {}
  @Put(":moduleId")
  @HttpCode(203)
  async handle(
    @Body() body: UpdateModuleBodySchema,
    @Param("moduleId") moduleId: string
  ) {
    const { cover_url, name, description, duration } = body;

    if (!moduleId) {
      throw new ConflictException("moduleId is required");
    }

    const module = await this.prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (!module) {
      throw new ConflictException("Module not found");
    }

    const moduleAlreadyExists = await this.prisma.module.findUnique({
      where: {
        name,
      },
    });

    if (moduleAlreadyExists) {
      throw new ConflictException(
        "There is already a module with the provided name. Please try another one."
      );
    }

    await this.prisma.module.update({
      where: {
        id: moduleId,
      },
      data: {
        name,
        description,
        duration,
        cover_url,
      },
    });
  }
}
