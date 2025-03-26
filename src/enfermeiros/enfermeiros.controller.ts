import { Controller, Get, Post, Body, Patch, Param, Delete, SetMetadata, UseGuards } from '@nestjs/common';
import { EnfermeirosService } from './enfermeiros.service';
import { CreateEnfermeiroDto } from './dto/create-enfermeiro.dto';
import { UpdateEnfermeiroDto } from './dto/update-enfermeiro.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { RolesGuard } from 'src/auth/guards/Roles.guard';

@Controller('api/v1/enfermeiros')
export class EnfermeirosController {
  constructor(private readonly enfermeirosService: EnfermeirosService) { }

  @IsPublic()
  @Post()
  async create(@Body() createEnfermeiroDto: CreateEnfermeiroDto) {
    return await this.enfermeirosService.createEnfermeiro(createEnfermeiroDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'enfermeiro')
  @Get()
  async findAll() {
    return this.enfermeirosService.findAll();
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'enfermeiro')
  @Patch(':id')
  async update(@Param('id') enfermeiroId: string, @Body() updateEnfermeiroDto: UpdateEnfermeiroDto) {
    return await this.enfermeirosService.updateEnfermeiro(enfermeiroId, updateEnfermeiroDto);
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', 'enfermeiro')
  @Delete(':id')
  async remove(@Param('id') enfermeiroId: string) {
    return this.enfermeirosService.remove(enfermeiroId);
  }
}
