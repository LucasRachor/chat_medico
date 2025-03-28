import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuestionarioService {
  constructor(private readonly prisma: PrismaClient) { }
  async create(createQuestionarioDto: CreateQuestionarioDto, equipeMedicaId: string) {
    try {
      await this.prisma.questionario.create({
        data: {
          ...createQuestionarioDto,
          alternativas: {
            create: createQuestionarioDto.alternativas.map((alternativa) => {
              return {
                alternativa: alternativa.alternativa,
                peso: alternativa.peso,
              }
            })
          },
          equipeMedica: {
            connect: {
              id: equipeMedicaId
            }
          }
        }
      })
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException("Erro interno do servidor", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return undefined;
  }

  async findAll() {
    return await this.prisma.questionario.findMany({
      select: {
        criadoEm: true,
        pergunta: true,
        observacao: true,
        peso: true,
        alternativas: {
          select: {
            alternativa: true,
            peso: true
          }
        }
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} questionario`;
  }

  update(id: number, updateQuestionarioDto: UpdateQuestionarioDto) {
    return `This action updates a #${id} questionario`;
  }

  async removeQuestionario(questionarioId: string) {
    const questionarioExiste = await this.prisma.questionario.findUnique({
      where: {
        id: questionarioId
      }
    })
    if (!questionarioExiste) {
      throw new HttpException("Questionário não encontrado", HttpStatus.NOT_FOUND);
    }
    await this.prisma.questionario.delete({
      where: {
        id: questionarioId
      }
    });
    return undefined;
  }
}
