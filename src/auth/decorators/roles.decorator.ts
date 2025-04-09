import { SetMetadata } from '@nestjs/common';

export const Roles = (role: 'enfermeiro' | 'medico' | 'paciente' | 'admin' ) => SetMetadata('role', role);
