import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [MedicosController],
  providers: [MedicosService, PrismaClient],
})
export class MedicosModule {}
