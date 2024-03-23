import {
  Body,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
} from "@nestjs/common";
import { z } from "zod";
import { PrismaService } from "../../services/prismaService";

const deleteModuleBodySchema = z.object({
  moduleId: z.string(),
});

type DeleteModuleBodySchema = z.infer<typeof deleteModuleBodySchema>;

@Controller("/modules")
export class DeleteModuleController {
  constructor(private prisma: PrismaService) {}
  @Delete()
  @HttpCode(204)
  async handle(@Body() body: DeleteModuleBodySchema) {
    const { moduleId } = body;

    if (!moduleId) {
      throw new ConflictException("moduleId is required");
    }

    const module = await this.prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (!module) {
      throw new ConflictException("No found a module with the specified id");
    }

    await this.prisma.module.delete({
      where: {
        id: moduleId,
      },
    });
  }
}
