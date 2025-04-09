import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateMedicoDto } from './dto/create-medico.dto';
import { UpdateMedicoDto } from './dto/update-medico.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service';
import { CreateEnfermeiroDto } from './dto/create-enfermeiro.dto';

@Injectable()
export class MedicosService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly userService: UserService
  ) { }

  async findByCrm(crm: string) {
    return await this.prisma.equipeMedica.findUnique({
      where: { CRM: crm }
    })
  }

  async createEnfermeiro(createEnfermeiroDto: CreateEnfermeiroDto) {
    try {
      if (!createEnfermeiroDto) {
        throw new HttpException("Preencha os campos necessários!", HttpStatus.BAD_REQUEST)
      }

      const duplicados = {};

      const corenExiste = await this.findByCrm(createEnfermeiroDto.coren)
      if (corenExiste) {
        duplicados["coren"] = "Coren já cadastrado";
      }

      const usernameExiste = await this.userService.findUserByUsername(createEnfermeiroDto.username);
      if (usernameExiste) {
        duplicados["username"] = "Username já cadastrado";
      }

      const emailExiste = await this.userService.findEmail(createEnfermeiroDto.email);
      if (emailExiste) {
        duplicados["email"] = "Email já cadastrado";
      }

      if (Object.keys(duplicados).length > 0) {
        throw new HttpException(
          { error: duplicados },
          HttpStatus.BAD_REQUEST
        );
      }

      await this.prisma.equipeMedica.create({
        data: {
          ...createEnfermeiroDto,
          password: await bcrypt.hash(createEnfermeiroDto.password, 10),
          role: "enfermeiro"
        }
      })

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  async createMedico(createMedicoDto: CreateMedicoDto) {
    try {

      if (!createMedicoDto) {
        throw new HttpException("Preencha os campos necessários!", HttpStatus.BAD_REQUEST)
      }

      const duplicados = {};

      const crmExiste = await this.findByCrm(createMedicoDto.CRM)

      if (crmExiste) {
        duplicados["CRM"] = "CRM já cadastrado";
      }

      const usernameExiste = await this.userService.findUserByUsername(createMedicoDto.username);
      if (usernameExiste) {
        duplicados["username"] = "Username já cadastrado";
      }

      const emailExiste = await this.userService.findEmail(createMedicoDto.email);
      if (emailExiste) {
        duplicados["email"] = "Email já cadastrado";
      }

      if (Object.keys(duplicados).length > 0) {
        throw new HttpException(
          { error: duplicados },
          HttpStatus.BAD_REQUEST
        );
      }

      await this.prisma.equipeMedica.create({
        data: {
          ...createMedicoDto,
          password: await bcrypt.hash(createMedicoDto.password, 10),
          role: "medico"
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
    return await this.prisma.equipeMedica.findMany({
      where: {
        role: {
          in: ["medico", "enfermeiro"]
        }
      },
      select: {
        id: true,
        nomeCompleto: true,
        email: true,
        username: true,
        CRM: true,
        coren: true,
        role: true,
      },
    });
  }

  async getEnfermeiros() {
    return await this.prisma.equipeMedica.findMany({
      where: {
        role: 'enfermeiro'
      },
      select: {
        nomeCompleto: true,
        email: true,
        username: true,
        coren: true
      }
    });
  }

  async update(medicoId: string, updateMedicoDto: UpdateMedicoDto) {
    try {
      const duplicados = {};

      const medicoAtual = await this.prisma.equipeMedica.findUnique({
        where: { id: medicoId },
      });

      if (!medicoAtual) {
        throw new HttpException("Médico não encontrado", HttpStatus.NOT_FOUND);
      }

      if (updateMedicoDto.username && updateMedicoDto.username !== medicoAtual.username) {
        const usernameExist = await this.userService.findUserByUsername(updateMedicoDto.username);
        if (usernameExist) {
          duplicados["username"] = "Username já cadastrado";
        }
      }

      if (updateMedicoDto.email && updateMedicoDto.email !== medicoAtual.email) {
        const emailExist = await this.userService.findEmail(updateMedicoDto.email);
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

      await this.prisma.equipeMedica.update({
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
      const medicoExiste = await this.prisma.equipeMedica.findUnique({
        where: {
          id: medicoId
        }
      })

      if (!medicoExiste) {
        throw new HttpException("Médico não encontrado", HttpStatus.NOT_FOUND)
      }

      await this.prisma.equipeMedica.delete({
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
