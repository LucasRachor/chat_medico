import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [],
  providers: [UserService, PrismaClient],
})
export class UserModule {}
