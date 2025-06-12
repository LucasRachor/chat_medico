import { Controller, Get, Post, Body, Param, Delete, SetMetadata, Patch } from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';

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

  @SetMetadata('roles', ['medico', 'enfermeiro'])
  @Delete(':id')
  removeQuestionario(@Param('id') questionarioId: string) {
    return this.questionarioService.removeQuestionario(questionarioId);
  }

  @Patch(':id')
  editQuestion(@Param('id') questionarioId: string, @Body() updateQuestionarioDto: UpdateQuestionarioDto) {
    console.log(updateQuestionarioDto);
    return this.questionarioService.editQuestionario(questionarioId, updateQuestionarioDto);
  }
}
