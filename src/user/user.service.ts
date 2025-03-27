import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaClient) { }

  async findUserByUsername(username: string) {
    const paciente = await this.prisma.paciente.findUnique({ where: { username } });
    if (paciente) return { ...paciente, userType: 'paciente' };

    const medico = await this.prisma.equipeMedica.findUnique({ where: { username } });
    if (medico) return { ...medico, userType: medico.role };

    return null;
  }

  async findEmail(email: string) {
    const paciente = await this.prisma.paciente.findUnique({ where: { email } })
    if (paciente) return true;

    const medico = await this.prisma.equipeMedica.findUnique({ where: { email } })
    if (medico) return true;

    return null;

  }

}
