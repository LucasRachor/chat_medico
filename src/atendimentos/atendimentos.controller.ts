import { Controller, Get, Post, Body, SetMetadata } from '@nestjs/common';
import { AtendimentosService } from './atendimentos.service';
import { CreateAtendimentoDto } from './dto/create-atendimento.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('atendimentos')
export class AtendimentosController {
  constructor(private readonly atendimentosService: AtendimentosService) {}

  @Post()
  async create(@Body() createAtendimentoDto: CreateAtendimentoDto) {
    return await this.atendimentosService.create(createAtendimentoDto);
  }

  @Get()
  async findAllWhereUzerId(@CurrentUser('id') pacienteId: string) {
    return await this.atendimentosService.findAllWhereUserId(pacienteId);
  }

  @SetMetadata('roles', ['medico', 'enfermeiro'])
  @Get('/all')
  async findAll() {
    return await this.atendimentosService.findAll();
  }
}
