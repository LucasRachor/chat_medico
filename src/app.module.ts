import { Module } from '@nestjs/common';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { JwtAuthGuard } from './auth/guards/JwtAuth.guard';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { PrismaClient } from '@prisma/client';
import { QuestionarioModule } from './questionario/questionario.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [PacientesModule, MedicosModule, UserModule, AuthModule, QuestionarioModule, ChatModule, UserModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtAuthGuard
  }, PrismaClient, JwtService],
})

export class AppModule { }
