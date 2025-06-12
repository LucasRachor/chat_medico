import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata } from '@nestjs/common';
import { AtendimentosService } from './atendimentos.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('atendimentos')
export class AtendimentosController {
  constructor(private readonly atendimentosService: AtendimentosService) { }

  @Post()
  create(@Body() createAtendimentoDto: CreateAtendimentoDto) {
    return this.atendimentosService.create(createAtendimentoDto);
  }

  @Get()
  findAllWhereUerId(@CurrentUser('id') pacienteId: string) {
    return this.atendimentosService.findAllWhereUserId(pacienteId);
  }

  @SetMetadata('roles', ['medico', 'enfermeiro'])
  @Get('/all')
  findAll() {
    return this.atendimentosService.findAll()
  }

}
