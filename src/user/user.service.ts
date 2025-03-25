import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) { }

  async findUserByUsername(username: string) {
    const paciente = await this.prisma.paciente.findUnique({ where: { username } });
    if (paciente) return { ...paciente, userType: 'paciente' };

    const medico = await this.prisma.medico.findUnique({ where: { username } });
    if (medico) return { ...medico, userType: 'medico' };

    const enfermeiro = await this.prisma.enfermeiro.findUnique({ where: { username } });
    if (enfermeiro) return { ...enfermeiro, userType: 'enfermeiro' };

    return null;
  }

  async findEmail(email: string) {
    const paciente = await this.prisma.paciente.findUnique({ where: { email } })
    if (paciente) return true;

    const medico = await this.prisma.medico.findUnique({ where: { email } })
    if (medico) return true;

    const enfermeiro = await this.prisma.enfermeiro.findUnique({ where: { email } })
    if (enfermeiro) return true;

    return null;

  }

}
