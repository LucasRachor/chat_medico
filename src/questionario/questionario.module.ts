import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { QuestionarioController } from './questionario.controller';
import { JwtExtractMiddleware } from 'src/auth/middlewares/jwt-extract.middleware';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [QuestionarioController],
  providers: [QuestionarioService, PrismaClient],
})
export class QuestionarioModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtExtractMiddleware)
      .forRoutes(QuestionarioController);
  }
}
