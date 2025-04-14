import { Module } from '@nestjs/common';
import { AtendimentosService } from './atendimentos.service';
import { AtendimentosController } from './atendimentos.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [AtendimentosController],
  providers: [AtendimentosService, PrismaClient],
})
export class AtendimentosModule {}
