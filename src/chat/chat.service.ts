import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaClient) {}

  async salvarMensagem(sala: string, remetenteId: string, mensagem: string) {
    return this.prisma.chatMessage.create({
      data: { sala, remetenteId, mensagem },
    });
  }

  async obterHistorico(sala: string) {
    return this.prisma.chatMessage.findMany({
      where: { sala },
      orderBy: { timestamp: 'asc' },
    });
  }
}
