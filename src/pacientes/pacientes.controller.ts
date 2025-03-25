import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('/api/v1/pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) { }

  @Get()
  async getCurrentPaciente() {
    return await this.pacientesService.getPaciente()
  }

  @IsPublic()
  @Post('create')
  async createPaciente(@Body() createPacienteDto: CreatePacienteDto) {
    return await this.pacientesService.createPaciente(createPacienteDto);
  }

  @Patch(':id')
  async updatePaciente(@Param('id') pacienteId: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return await this.pacientesService.updatePaciente(pacienteId, updatePacienteDto)
  }

  @Delete(':id')
  async deletePaciente(@Param('id') pacienteId: string) {
    return await this.pacientesService.deletePaciente(pacienteId)
  }

}
