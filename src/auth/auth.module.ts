import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from 'src/user/user.service';
import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config(); // Carrega as variáveis do .env

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '24h'},
    }),
  ],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy, PrismaClient],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
