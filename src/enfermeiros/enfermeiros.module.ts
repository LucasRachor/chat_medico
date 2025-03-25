import { Module } from '@nestjs/common';
import { EnfermeirosService } from './enfermeiros.service';
import { EnfermeirosController } from './enfermeiros.controller';
import { PrismaClient } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [EnfermeirosController],
  providers: [EnfermeirosService, PrismaClient, UserService],
})
export class EnfermeirosModule {}
