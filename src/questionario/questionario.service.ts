import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class QuestionarioService {
  constructor(private readonly prisma: PrismaClient) { }
  async create(createQuestionarioDto: CreateQuestionarioDto, equipeMedica: string) {
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
              id: equipeMedica
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

  async findAll(equipeMedica: string) {
    return await this.prisma.questionario.findMany({
      where: {
        equipeMedica: {
          id: equipeMedica
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
  
  // async update(id: string, updateQuestionarioDto: UpdateQuestionarioDto) {
  //   try {

  //     if (!updateQuestionarioDto) {
  //       throw new HttpException("É necessário informar uma pergunta ou alternativas", HttpStatus.BAD_REQUEST);
  //     }

  //     const questionarioExiste = await this.prisma.questionario.findUnique({
  //       where: { id },
  //       include: { alternativas: true }
  //     });

  //     if (!questionarioExiste) {
  //       throw new HttpException("Questionário não encontrado", HttpStatus.NOT_FOUND);
  //     }

  //     await this.prisma.alternativa.deleteMany({
  //       where: { questionarioId: id }
  //     });

  //     return await this.prisma.questionario.update({
  //       where: { id },
  //       data: {
  //         pergunta: updateQuestionarioDto.pergunta,
  //         peso: updateQuestionarioDto.peso,
  //         observacao: updateQuestionarioDto.observacao,
  //         alternativas: updateQuestionarioDto.alternativas ? {
  //           update: updateQuestionarioDto.alternativas.map((alternativa) => ({
  //             where: { id: alternativa.id },
  //             data: {
  //               alternativa: alternativa.alternativa,
  //               peso: alternativa.peso,
  //             }
  //           }))
  //         } : undefined
  //       },
  //       include: {
  //         alternativas: true
  //       }
  //     });
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }
  //     console.log(error)
  //     throw new HttpException("Erro interno do servidor", HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  async removeQuestionario(questionarioId: string, equipeMedica: string) {
    const questionarioExiste = await this.prisma.questionario.findUnique({
      where: {
        id: questionarioId
      }
    })

    if (!questionarioExiste) {
      throw new HttpException("Questionário não encontrado", HttpStatus.NOT_FOUND);
    }

    if (questionarioExiste.equipeMedicaId !== equipeMedica) {
      throw new HttpException("Você não tem permissão para deletar este questionário", HttpStatus.FORBIDDEN);
    }

    await this.prisma.questionario.delete({
      where: {
        id: questionarioId
      }
    });
    return undefined;
  }
}
