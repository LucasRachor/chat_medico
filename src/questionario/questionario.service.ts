import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuestionarioService {
  constructor(private readonly prisma: PrismaClient) { }
  async create(createQuestionarioDto: CreateQuestionarioDto, equipeMedicaId: string) {
    try {
      await this.prisma.questionario.create({
        data: {
          ...createQuestionarioDto,
          peso: +createQuestionarioDto.peso,
          alternativas: {
            create: createQuestionarioDto.alternativas.map((alternativa) => {
              return {
                alternativa: alternativa.alternativa,
                peso: +alternativa.peso,
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
      console.log(error)
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

  async findQuestionsByUser(userId: string) {

    if (!userId) {
      throw new HttpException("Usuário não encontrado", HttpStatus.NOT_FOUND);
    }

    return await this.prisma.questionario.findMany({
      where: {
        equipeMedica: {
          id: userId
        }

      },
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

  async removeQuestionario(questionarioId: string, userId: string) {
    const questionarioExiste = await this.prisma.questionario.findUnique({
      where: {
        id: questionarioId
      }
    })

    if (questionarioExiste?.equipeMedicaId !== userId) {
      throw new HttpException("Você não tem permissão para deletar este questionário", HttpStatus.FORBIDDEN);
    }

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
