import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { PacientesService } from './pacientes.service';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { RolesGuard } from 'src/auth/guards/Roles.guard';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) { }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'paciente')
  @Get()
  async getCurrentPaciente() {
    return await this.pacientesService.getPaciente()
  }

  @IsPublic()
  @Post()
  async createPaciente(@Body() createPacienteDto: CreatePacienteDto) {
    return await this.pacientesService.createPaciente(createPacienteDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'paciente')
  @Patch(':id')
  async updatePaciente(@Param('id') pacienteId: string, @Body() updatePacienteDto: UpdatePacienteDto) {
    return await this.pacientesService.updatePaciente(pacienteId, updatePacienteDto)
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'paciente')
  @Delete(':id')
  async deletePaciente(@Param('id') pacienteId: string) {
    return await this.pacientesService.deletePaciente(pacienteId)
  }

}
