import { Module } from '@nestjs/common';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';

@Module({
  imports: [PacientesModule, MedicosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
