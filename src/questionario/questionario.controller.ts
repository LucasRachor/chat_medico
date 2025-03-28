import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  create(@CurrentUser('id') userId: string, @Body() createQuestionarioDto: CreateQuestionarioDto) {
    return this.questionarioService.create(createQuestionarioDto, userId);
  }

  @IsPublic()
  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.questionarioService.findAll(userId);
  }

  @IsPublic()
  @Delete(':id')
  removeQuestionario(@CurrentUser('id') userId: string,@Param('id') questionarioId: string) {
    return this.questionarioService.removeQuestionario(questionarioId, userId);
  }
}
