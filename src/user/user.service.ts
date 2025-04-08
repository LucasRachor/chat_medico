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

  async findUserData(userId: string) {
    const paciente = await this.prisma.paciente.findUnique({
      where: {
        id: userId
      },
      select: {
        nomeCompleto: true
      }
    })

    if (paciente) {
      return JSON.stringify(paciente.nomeCompleto)
    }

    const medico = await this.prisma.equipeMedica.findUnique({
      where: {
        id: userId
      },
      select: {
        nomeCompleto: true
      }
    })

    if (medico) {
      return JSON.stringify(medico.nomeCompleto)
    }

  }

  async findEmail(email: string) {
    const paciente = await this.prisma.paciente.findUnique({ where: { email } })
    if (paciente) return true;

    const medico = await this.prisma.equipeMedica.findUnique({ where: { email } })
    if (medico) return true;

    return null;

  }

}
