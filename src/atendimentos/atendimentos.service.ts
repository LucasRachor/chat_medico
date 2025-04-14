import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { UpdateAtendimentoDto } from './dto/update-atendimento.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AtendimentosService {
  constructor(private readonly prisma: PrismaClient) { }

  async create(createAtendimentoDto: CreateAtendimentoDto) {
    try {
      const atendimento = await this.prisma.atendimento.create({
        data: {
          tipoAtendimento: createAtendimentoDto.tipoAtendimento,
          pacienteId: createAtendimentoDto.pacienteId,
          temperatura: createAtendimentoDto.temperatura,
          pressaoArterial: createAtendimentoDto.pressaoArterial,
        },
      });

      if (createAtendimentoDto.respostas && createAtendimentoDto.respostas.length > 0) {
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
        console.log(error)
        throw error;
      }
      console.log(error)
      throw new HttpException('Erro interno do servidor', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return undefined;
  }

  async findAll(pacienteId: string) {
    return await this.prisma.atendimento.findMany({
      where: {
        pacienteId: pacienteId
      },
      select: {
        dataAtendimento: true,
        pressaoArterial: true,
        temperatura: true,
        tipoAtendimento: true,
        respostas: {
          select: {
            pergunta: true,
            resposta: true
          }
        }
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} atendimento`;
  }

  update(id: number, updateAtendimentoDto: UpdateAtendimentoDto) {
    return `This action updates a #${id} atendimento`;
  }

  remove(id: number) {
    return `This action removes a #${id} atendimento`;
  }
}
