import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { UserService } from 'src/user/user.service';


@Injectable()
export class PacientesService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly userService: UserService
  ) { }

  async getInfoPaciente(pacienteId: string) {
    return await this.prisma.paciente.findUnique({
      where: { id: pacienteId },
      select: {
        nomeCompleto: true,
        dataNascimento: true,
        idade: true,
        genero: true,
      }
    })
  }

  async findByPhone(phone: string) {
    return await this.prisma.paciente.findUnique({
      where: { telefone: phone }
    })
  }

  async findByCpf(cpf: string) {
    return await this.prisma.paciente.findUnique({
      where: { cpf: cpf }
    })
  }

  async getPaciente() {
    return await this.prisma.paciente.findMany({
      select: {
        nomeCompleto: true,
        cpf: true,
        email: true,
        dataNascimento: true,
        grauDeInstrucao: true,
        username: true,
        idade: true,
        genero: true,
        telefone: true,
        endereco: {
          select: {
            rua: true,
            numero: true,
            bairro: true,
            cidade: true,
            cep: true
          }
        }
      },
    })
  }

  //criar os pacientes
  async createPaciente(createPacienteDto: CreatePacienteDto) {
    try {

      if (!createPacienteDto) {
        throw new HttpException("Preencha os campos necessários!", HttpStatus.BAD_REQUEST)
      }

      const duplicados = {};

      const cpfExiste = await this.findByCpf(createPacienteDto.cpf)

      if (cpfExiste) {
        duplicados["cpf"] = "CPF já cadastrado";
      }

      const usernameExiste = await this.userService.findUserByUsername(createPacienteDto.username);
      if (usernameExiste) {
        duplicados["username"] = "Username já cadastrado";
      }

      const emailExiste = await this.userService.findEmail(createPacienteDto.email);
      if (emailExiste) {
        duplicados["email"] = "Email já cadastrado";
      }

      const phoneExiste = await this.findByPhone(createPacienteDto.telefone);
      if (phoneExiste) {
        duplicados["telefone"] = "Telefone já cadastrado";
      }

      if (Object.keys(duplicados).length > 0) {
        throw new HttpException(
          { error: duplicados },
          HttpStatus.BAD_REQUEST
        );
      }

      await this.prisma.paciente.create({
        data: {
          ...createPacienteDto,
          password: await bcrypt.hash(createPacienteDto.password, 10),
          endereco: {
            create: {
              bairro: createPacienteDto.endereco.bairro,
              cep: createPacienteDto.endereco.cep,
              cidade: createPacienteDto.endereco.cidade,
              numero: createPacienteDto.endereco.numero,
              rua: createPacienteDto.endereco.rua
            }
          }
        }
      });

    } catch (error) {
      console.log(error)
      if (error instanceof HttpException) {
        throw error;
      }
    }
    return undefined;
  }

  //update nos pacientes
  async updatePaciente(pacienteId: string, updatePacienteDto: UpdatePacienteDto) {
    if (!updatePacienteDto || Object.keys(updatePacienteDto).length === 0) {
      throw new HttpException("nenhum campo enviado", HttpStatus.BAD_REQUEST);
    }

    const duplicados = {};

    const pacienteAtual = await this.prisma.paciente.findUnique({
      where: { id: pacienteId },
    });

    if (!pacienteAtual) {
      throw new HttpException("Paciente não encontrado", HttpStatus.NOT_FOUND);
    }

    if (updatePacienteDto.username && updatePacienteDto.username !== pacienteAtual.username) {
      const usernameExiste = await this.userService.findUserByUsername(updatePacienteDto.username);
      if (usernameExiste) {
        duplicados["username"] = "Username já cadastrado";
      }
    }

    if (updatePacienteDto.email && updatePacienteDto.email !== pacienteAtual.email) {
      const emailExiste = await this.userService.findEmail(updatePacienteDto.email);
      if (emailExiste) {
        duplicados["email"] = "Email já cadastrado";
      }
    }

    if (updatePacienteDto.telefone && updatePacienteDto.telefone !== pacienteAtual.telefone) {
      const phoneExiste = await this.findByPhone(updatePacienteDto.telefone);
      if (phoneExiste) {
        duplicados["telefone"] = "Telefone já cadastrado";
      }
    }

    if (Object.keys(duplicados).length > 0) {
      throw new HttpException(
        { error: duplicados },
        HttpStatus.BAD_REQUEST
      );
    }

    await this.prisma.paciente.update({
      where: { id: pacienteId },
      data: { ...updatePacienteDto },
    });

    return undefined;

  }

  async deletePaciente(pacienteId: string) {

    try {
      const pacienteExiste = await this.prisma.paciente.findUnique({
        where: { id: pacienteId },
      });

      if (!pacienteExiste) {
        throw new HttpException("Paciente não encontrado", HttpStatus.NOT_FOUND);
      }

      await this.prisma.paciente.delete({
        where: {
          id: pacienteId
        }
      })

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
    return undefined;

  }

}
