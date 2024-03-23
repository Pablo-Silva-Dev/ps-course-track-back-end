import {
    Body,
    ConflictException,
    Controller,
    Get,
    HttpCode,
  } from "@nestjs/common";
  import { z } from "zod";
  import { PrismaService } from "../../services/prismaService";
  
  const getTutorBodySchema = z.object({
    tutorId: z.string(),
  });
  
  type GetTutorBodySchema = z.infer<typeof getTutorBodySchema>;
  
  @Controller("/tutors/getUnique")
  export class GetTutorController {
    constructor(private prisma: PrismaService) {}
    @Get()
    @HttpCode(200)
    async handle(@Body() body: GetTutorBodySchema) {
      const { tutorId } = body;
  
      if (!tutorId) {
        throw new ConflictException("tutorId is required");
      }
  
      const tutor = await this.prisma.tutor.findUnique({
        where: {
          id: tutorId,
        },
      });
  
      if (!tutor) {
        throw new ConflictException("No tutor found for the provided tutorId");
      }
  
      return tutor;
    }
  }
  