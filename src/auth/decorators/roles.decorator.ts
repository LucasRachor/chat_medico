import { SetMetadata } from '@nestjs/common';

export const Roles = (role: 'medico' | 'paciente' | 'enfermeiro') => SetMetadata('role', role);
