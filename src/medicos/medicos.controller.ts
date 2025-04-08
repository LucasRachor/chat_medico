import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { RolesGuard } from 'src/auth/guards/Roles.guard';
import { CreateEnfermeiroDto } from './dto/create-enfermeiro.dto';

@Controller('equipe-medica')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) { }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'admin')
  @Get('medicos')
  getMedicos() {
    return this.medicosService.getMedicos();
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'admin')
  @Get('enfermeiros')
  getEnfermeiros() {
    return this.medicosService.getEnfermeiros();
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'admin')
  @Post('medico')
  createMedico(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.createMedico(createMedicoDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'admin')
  @Post('enfermeiro')
  createEnfermeiro(@Body() createEnfermeiroDto: CreateEnfermeiroDto) {
    return this.medicosService.createEnfermeiro(createEnfermeiroDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'admin')
  @Patch(':id')
  updateMedico(@Param('id') medicoId: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(medicoId, updateMedicoDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'admin')
  @Delete(':id')
  removeMedico(@Param('id') medicoId: string) {
    return this.medicosService.removerMedico(medicoId);
  }
}
