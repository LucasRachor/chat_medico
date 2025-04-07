import { Controller, Get, Post, Body, Param, Delete, SetMetadata } from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('questionario')
export class QuestionarioController {
  constructor(private readonly questionarioService: QuestionarioService) { }

  @SetMetadata('roles', ['medico', 'enfermeiro'])
  @Post()
  create(@CurrentUser('id') userId: string, @Body() createQuestionarioDto: CreateQuestionarioDto) {
    return this.questionarioService.create(createQuestionarioDto, userId);
  }

  @Get()
  findAll() {
    return this.questionarioService.findAll();
  }

  @Get('medicos')
  findQuestiosByUser(@CurrentUser('id') userId: string) {
    return this.questionarioService.findQuestionsByUser(userId);
  }

  @SetMetadata('roles', ['medico', 'enfermeiro'])
  @Delete(':id')
  removeQuestionario(@CurrentUser('id') userId: string, @Param('id') questionarioId: string) {
    return this.questionarioService.removeQuestionario(questionarioId, userId);
  }
}
