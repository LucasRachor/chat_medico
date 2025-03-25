import { Module } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { PacientesController } from './pacientes.controller';
import { PrismaClient } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [PacientesController],
  providers: [PacientesService, PrismaClient, UserService],
})
export class PacientesModule {}
