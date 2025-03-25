import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';

@Controller('/api/v1/pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) { }

  @Get()
  async getCurrentPaciente() {
    return await this.pacientesService.getPaciente()
  }

  @Post('create')
  async createPaciente(@Body() createPacienteDto: CreatePacienteDto) {
    return await this.pacientesService.createPaciente(createPacienteDto);
  }

  @Patch(':id')
  async updatePaciente(@Param('id') id: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return await this.pacientesService.updatePaciente(id, updatePacienteDto)
  }

  @Delete(':id')
  async deletePaciente(@Param('id') id: string) {
    return await this.pacientesService.deletePaciente(id)
  }

}
