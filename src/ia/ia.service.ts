import { Injectable } from '@nestjs/common';
import aiApi from 'src/services/api';
import { IaRequestDto } from './dto/ia-request.dto';
import { PrismaService } from 'src/database/prisma.service';

export class CreateLogEntryDto {
  atendimentoId: string;
  mensagem: string;
  resposta: string;
  tipo_retorno: number;
}

@Injectable()
export class IaService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLogEntry(data: CreateLogEntryDto) {
    return await this.prismaService.historicoIa.create({
      data: {
        atendimentoId: data.atendimentoId,
        mensagem: data.mensagem,
        resposta: data.resposta,
        tipo_retorno: data.tipo_retorno,
      },
    });
  }

  async generateResponse(userId: string, data: IaRequestDto) {
    const atendimento = await this.prismaService.atendimento.findFirst({
      where: {
        pacienteId: userId,
        tipoAtendimento: 'IA',
      },
      orderBy: {
        dataAtendimento: 'desc',
      },
      include: {
        historicoIas: true,
      },
    });

    if (!atendimento) {
      throw new Error('Atendimento não encontrado para o paciente.');
    }

    const historyForIa = atendimento.historicoIas
      .slice()
      .sort((a, b) => a.criadoEm.getTime() - b.criadoEm.getTime())
      .map((item, idx) => {
        return {
          id: idx + 1,
          mensagem: item.mensagem || '',
          temperatura: atendimento.temperatura || '',
          pressao: atendimento.pressaoArterial || '',
          resposta: item.resposta || '',
          tipo_retorno: item.tipo_retorno || '',
        };
      });
    try {
      const response = await aiApi.post('/generate/', {
        num_mensagens: data.num_mensagens,
        historico: historyForIa,
        mensagem: data.mensagem,
        nome_paciente: data.nome_paciente,
        final: data.final,
      });

      await this.createLogEntry({
        atendimentoId: atendimento?.id || '',
        mensagem: data.mensagem,
        resposta: response.data.resposta,
        tipo_retorno: response.data.tipo_retorno,
      });

      return { mensagem: response.data.resposta };
    } catch (error) {
      console.log('erro da ia -->', error.response.data);
      throw new Error('Erro ao gerar resposta da IA: ' + error.message);
    }
  }
}
