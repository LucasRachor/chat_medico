import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService, PrismaClient],
})
export class PacientesModule {}
