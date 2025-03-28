import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionarioService } from './questionario.service';
import { CreateQuestionarioDto } from './dto/create-questionario.dto';
import { UpdateQuestionarioDto } from './dto/update-questionario.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('questionario')
export class QuestionarioController {
  constructor(private readonly questionarioService: QuestionarioService) { }

  @IsPublic()
  @Post()
  create(@Body() createQuestionarioDto: CreateQuestionarioDto, equipeMedicaId: string) {
    return this.questionarioService.create(createQuestionarioDto, equipeMedicaId);
  }

  @IsPublic()
  @Get()
  findAll() {
    return this.questionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionarioDto: UpdateQuestionarioDto) {
    return this.questionarioService.update(+id, updateQuestionarioDto);
  }

  @IsPublic()
  @Delete(':id')
  removeQuestionario(@Param('id') id: string) {
    return this.questionarioService.removeQuestionario(id);
  }
}
