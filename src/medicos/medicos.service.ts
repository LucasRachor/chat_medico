import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MedicosService {
  constructor(private readonly prisma: PrismaClient) { }

  async findByUsername(username: string) {
    return await this.prisma.medico.findUnique({
      where: { username: username }
    })
  }

  async findByEmail(email: string) {
    return await this.prisma.medico.findUnique({
      where: { email: email }
    })
  }

  async findByCrm(crm: string) {
    return await this.prisma.medico.findUnique({
      where: { CRM: crm }
    })
  }


  async create(createMedicoDto: CreateMedicoDto) {
    try {

      if (!createMedicoDto) {
        throw new HttpException("Preencha os campos necessários!", HttpStatus.BAD_REQUEST)
      }

      const duplicados = {};

      const cpfExist = await this.findByCrm(createMedicoDto.CRM)

      if (cpfExist) {
        duplicados["CRM"] = "CRM já cadastrado";
      }

      const usernameExist = await this.findByUsername(createMedicoDto.username);
      if (usernameExist) {
        duplicados["username"] = "Username já cadastrado";
      }

      const emailExist = await this.findByEmail(createMedicoDto.email);
      if (emailExist) {
        duplicados["email"] = "Email já cadastrado";
      }

      if (Object.keys(duplicados).length > 0) {
        throw new HttpException(
          { error: duplicados },
          HttpStatus.BAD_REQUEST
        );
      }

      await this.prisma.medico.create({
        data: {
          ...createMedicoDto
        }
      })


    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
    return undefined;
  }

  async getMedicos() {
    return await this.prisma.medico.findMany({
      select: {
        nome_completo: true,
        email: true,
        username: true,
        CRM: true
      }
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} medico`;
  }

  async update(medicoId: string, updateMedicoDto: UpdateMedicoDto) {
    try {
      const duplicados = {};

      const medicoAtual = await this.prisma.medico.findUnique({
        where: { id: medicoId },
      });

      if (!medicoAtual) {
        throw new HttpException("Médico não encontrado", HttpStatus.NOT_FOUND);
      }

      if (updateMedicoDto.username && updateMedicoDto.username !== medicoAtual.username) {
        const usernameExist = await this.findByUsername(updateMedicoDto.username);
        if (usernameExist) {
          duplicados["username"] = "Username já cadastrado";
        }
      }

      if (updateMedicoDto.email && updateMedicoDto.email !== medicoAtual.email) {
        const emailExist = await this.findByEmail(updateMedicoDto.email);
        if (emailExist) {
          duplicados["email"] = "Email já cadastrado";
        }
      }

      if (Object.keys(duplicados).length > 0) {
        throw new HttpException(
          { error: duplicados },
          HttpStatus.BAD_REQUEST
        );
      }

      await this.prisma.medico.update({
        where: { id: medicoId },
        data: { ...updateMedicoDto },
      });

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
    return undefined;

  }

  async removerMedico(medicoId: string) {
    try {
      const medicoExiste = await this.prisma.medico.findUnique({
        where: {
          id: medicoId
        }
      })

      if (!medicoExiste) {
        throw new HttpException("Médico não encontrado", HttpStatus.BAD_REQUEST)
      }

      await this.prisma.medico.delete({
        where: {
          id: medicoId
        }
      });

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
    return undefined;
  }
}
