import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('/api/v1/pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) { }

  @Post('create')
  createPaciente(@Body() createPacienteDto: CreatePacienteDto) {
    return this.pacientesService.createPaciente(createPacienteDto);
  }

  @Patch(':id')
  updatePaciente(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return this.pacientesService.updatePaciente(id, updatePacienteDto)
  }

  @Delete(':id')
  deletePaciente(@Param('id') id: string) {
    return this.pacientesService.deletePaciente(id)
  }

}
