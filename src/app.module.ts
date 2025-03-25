import { Module } from '@nestjs/common';
import { PacientesModule } from './pacientes/pacientes.module';
import { MedicosModule } from './medicos/medicos.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PacientesModule, MedicosModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
