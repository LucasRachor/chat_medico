import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('questionario')
export class QuestionarioController {
  constructor(private readonly questionarioService: QuestionarioService) { }

  @IsPublic()
  @Post()
  async create(
    @Body() createQuestionarioDto: CreateQuestionarioDto,
    @CurrentUser() user: { id: string; nome: string }
  ) {
    return await this.questionarioService.create(createQuestionarioDto, user.id);
  }

  @Get()
  async findAll(
    @CurrentUser() user: { id: string; nome: string }
  ) {
    return await this.questionarioService.findAll(user.id);
  }

  //@IsPublic()
  //@Patch(':id')
  //update(
  //  @Param('id') id: string,
  //  @Body() updateQuestionarioDto: UpdateQuestionarioDto,
  //  @CurrentUser() user: { id: string; nome: string }
  //) {
  //  return this.questionarioService.update(id, updateQuestionarioDto);
  //}

  @IsPublic()
  @Delete(':id')
  async removeQuestionario(
    @Param('id') questionarioId: string,
    @CurrentUser() user: { id: string; nome: string }
  ) {
    return await this.questionarioService.removeQuestionario(questionarioId, user.id);
  }
}
