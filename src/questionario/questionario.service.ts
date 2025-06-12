import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { PrismaClient } from '@prisma/client';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';

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
        id: true,
        criadoEm: true,
        pergunta: true,
        observacao: true,
        peso: true,
        alternativas: {
          select: {
            id: true,
            alternativa: true,
            peso: true
          }
        }
      }
    });
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

  async editQuestionario(questionarioId: string, updateQuestionarioDto: UpdateQuestionarioDto) {
    const questionarioExiste = await this.prisma.questionario.findUnique({
      where: {
        id: questionarioId
      }
    })

    if (!questionarioExiste) {
      throw new HttpException("Questionário não encontrado", HttpStatus.NOT_FOUND);
    }

    await this.prisma.alternativa.deleteMany({
      where: {
        questionarioId: questionarioId
      }
    })

    await this.prisma.questionario.update({
      where: {
        id: questionarioId
      },
      data: {
        ...updateQuestionarioDto,
        alternativas: {
          create: updateQuestionarioDto.alternativas?.map(altern => {
            return {
              alternativa: altern.alternativa,
              peso: Number(altern.peso)
            }
          })
        }
      }
    });

  }

}

