import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('api/v1/medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) { }

  @IsPublic()
  @Get()
  getMedicos() {
    return this.medicosService.getMedicos();
  }

  @IsPublic()
  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDto);
  }

  @Patch(':id')
  update(@Param('id') medicoId: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(medicoId, updateMedicoDto);
  }

  @Delete(':id')
  remove(@Param('id') medicoId: string) {
    return this.medicosService.removerMedico(medicoId);
  }
}
