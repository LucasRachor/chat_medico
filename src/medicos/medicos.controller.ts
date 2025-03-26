import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { MedicosService } from './medicos.service';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { RolesGuard } from 'src/auth/guards/Roles.guard';

@Controller('api/v1/medicos')
export class MedicosController {
  constructor(private readonly medicosService: MedicosService) { }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'medico')
  @Get()
  getMedicos() {
    return this.medicosService.getMedicos();
  }

  @IsPublic()
  @Post()
  create(@Body() createMedicoDto: CreateMedicoDto) {
    return this.medicosService.create(createMedicoDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'medico')
  @Patch(':id')
  update(@Param('id') medicoId: string, @Body() updateMedicoDto: UpdateMedicoDto) {
    return this.medicosService.update(medicoId, updateMedicoDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'medico')
  @Delete(':id')
  remove(@Param('id') medicoId: string) {
    return this.medicosService.removerMedico(medicoId);
  }
}
