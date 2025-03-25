import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { PrismaClient } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [MedicosController],
  providers: [MedicosService, PrismaClient, UserService],
})
export class MedicosModule {}
