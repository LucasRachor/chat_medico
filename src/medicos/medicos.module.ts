import { Module } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { MedicosController } from './medicos.controller';
import { PrismaClient } from '@prisma/client';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [MedicosController],
  providers: [MedicosService, PrismaClient],
  exports: [MedicosService]
})
export class MedicosModule {}
