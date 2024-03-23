import {
    Body,
    ConflictException,
    Controller,
    Get,
    HttpCode,
  } from "@nestjs/common";
  import { z } from "zod";
  import { PrismaService } from "../../services/prismaService";
  
  const getModuleBodySchema = z.object({
    moduleId: z.string(),
  });
  
  type GetModuleBodySchema = z.infer<typeof getModuleBodySchema>;
  
  @Controller("/modules/getUnique")
  export class GetModuleController {
    constructor(private prisma: PrismaService) {}
    @Get()
    @HttpCode(200)
    async handle(@Body() body: GetModuleBodySchema) {
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
        throw new ConflictException("No module found for the provided moduleId");
      }
  
      return module;
    }
  }
  