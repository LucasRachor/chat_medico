import { Module } from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { QuestionarioController } from './questionario.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [QuestionarioController],
  providers: [QuestionarioService, PrismaClient],
})
export class QuestionarioModule {}
