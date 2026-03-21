import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AtendimentosService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createAtendimentoDto: CreateAtendimentoDto) {
    try {
      const atendimento = await this.prisma.atendimento.create({
        data: {
          tipoAtendimento: createAtendimentoDto.tipoAtendimento,
          pacienteId: createAtendimentoDto.pacienteId,
          temperatura: createAtendimentoDto.temperatura,
          pressaoArterial: createAtendimentoDto.pressaoArterial,
          classificacaoRisco: createAtendimentoDto.classificacaoRisco,
        },
      });

      if (
        createAtendimentoDto.respostas &&
        createAtendimentoDto.respostas.length > 0
      ) {
        await this.prisma.resposta.createMany({
          data: createAtendimentoDto.respostas.map((data) => ({
            atendimentoId: atendimento.id,
            pergunta: data.pergunta,
            resposta: data.resposta,
          })),
        });
      }
    } catch (error) {
      if (error instanceof HttpException) {
        console.log(error);
        throw error;
      }
      console.log(error);
      throw new HttpException(
        'Erro interno do servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return undefined;
  }

  async findAllWhereUserId(pacienteId: string) {
    const atendimentos = await this.prisma.atendimento.findMany({
      orderBy: {
        dataAtendimento: 'desc',
      },
      where: {
        pacienteId: pacienteId,
      },
      select: {
        dataAtendimento: true,
        pressaoArterial: true,
        temperatura: true,
        tipoAtendimento: true,
        classificacaoRisco: true,
        paciente: {
          select: {
            endereco: {
              select: {
                cidade: true,
              },
            },
          },
        },
        respostas: {
          select: {
            pergunta: true,
            resposta: true,
          },
        },
      },
    });

    if (atendimentos.length === 0) return [];

    const atendimentosFormatados = atendimentos.map((atend) => {
      return {
        dataAtendimento: atend.dataAtendimento,
        pressaoArterial: atend.pressaoArterial,
        temperatura: atend.temperatura,
        tipoAtendimento: atend.tipoAtendimento,
        classificacaoRisco: atend.classificacaoRisco,
        cidade: atend.paciente.endereco[0].cidade,
        respostas: atend.respostas,
      };
    });

    return atendimentosFormatados;
  }

  async findAll() {
    const atendimentos = await this.prisma.atendimento.findMany({
      orderBy: {
        dataAtendimento: 'desc',
      },
      select: {
        dataAtendimento: true,
        pressaoArterial: true,
        temperatura: true,
        tipoAtendimento: true,
        classificacaoRisco: true,
        paciente: {
          select: {
            nomeCompleto: true,
            endereco: {
              select: {
                cidade: true,
              },
            },
          },
        },
        respostas: {
          select: {
            pergunta: true,
            resposta: true,
          },
        },
      },
    });

    if (atendimentos.length === 0) return [];

    const atendimentosFormatados = atendimentos.map((atend) => {
      return {
        dataAtendimento: atend.dataAtendimento,
        nomePaciente: atend.paciente.nomeCompleto,
        pressaoArterial: atend.pressaoArterial,
        temperatura: atend.temperatura,
        tipoAtendimento: atend.tipoAtendimento,
        classificacaoRisco: atend.classificacaoRisco,
        cidade: atend.paciente.endereco[0].cidade,
        respostas: atend.respostas,
      };
    });

    return atendimentosFormatados;
  }
}
