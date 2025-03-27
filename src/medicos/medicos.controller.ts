import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { RolesGuard } from 'src/auth/guards/Roles.guard';
import { CreateEnfermeiroDto } from './dto/create-enfermeiro.dto';

@Controller('equipe-medica')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) { }

  @IsPublic()
  @Get('medicos')
  getMedicos() {
    return this.medicosService.getMedicos();
  }

  @IsPublic()
  @Get('enfermeiros')
  getEnfermeiros() {
    return this.medicosService.getEnfermeiros();
  }

  @IsPublic()
  @Post('medico')
  createMedico(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.createMedico(createMedicoDto);
  }

  @IsPublic()
  @Post('enfermeiro')
  createEnfermeiro(@Body() createEnfermeiroDto: CreateEnfermeiroDto) {
    return this.medicosService.createEnfermeiro(createEnfermeiroDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'medico')
  @Patch(':id')
  updateMedico(@Param('id') medicoId: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(medicoId, updateMedicoDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'medico')
  @Delete(':id')
  removeMedico(@Param('id') medicoId: string) {
    return this.medicosService.removerMedico(medicoId);
  }
}
