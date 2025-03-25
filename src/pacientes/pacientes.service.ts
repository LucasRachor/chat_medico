import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { PrismaClient } from '@prisma/client';
import { UpdatePacienteDto } from './dto/update-paciente.dto';


@Injectable()
export class PacientesService {
  constructor(private readonly prisma: PrismaClient) { }

  async findByUsername(username: string) {
    return await this.prisma.paciente.findUnique({
      where: { username: username }
    })
  }

  async findByEmail(email: string) {
    return await this.prisma.paciente.findUnique({
      where: { email: email }
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

  //criar os pacientes
  async createPaciente(createPacienteDto: CreatePacienteDto) {
    try {

      if (!createPacienteDto) {
        throw new HttpException("Preencha os campos necessários!", HttpStatus.BAD_REQUEST)
      }

      const duplicados = {};

      const cpfExist = await this.findByCpf(createPacienteDto.cpf)

      if (cpfExist) {
        duplicados["cpf"] = "CPF já cadastrado";
      }

      const usernameExist = await this.findByUsername(createPacienteDto.username);
      if (usernameExist) {
        duplicados["username"] = "Username já cadastrado";
      }

      const emailExist = await this.findByEmail(createPacienteDto.email);
      if (emailExist) {
        duplicados["email"] = "Email já cadastrado";
      }

      const phoneExist = await this.findByPhone(createPacienteDto.telefone);
      if (phoneExist) {
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
          cpf: createPacienteDto.cpf,
          username: createPacienteDto.username,
          password: createPacienteDto.password,
          email: createPacienteDto.email,
          nome_completo: createPacienteDto.nome_completo,
          data_nascimento: createPacienteDto.data_nascimento,
          genero: createPacienteDto.genero,
          grau_de_instrucao: createPacienteDto.grau_de_instrucao,
          idade: createPacienteDto.idade,
          telefone: createPacienteDto.telefone,
          endereco: {
            create: {
              bairro: createPacienteDto.endereco.bairro,
              cep: createPacienteDto.endereco.cep,
              cidade: createPacienteDto.endereco.cidade,
              numero: createPacienteDto.endereco.numero,
              rua: createPacienteDto.endereco.rua,
            }
          }
        }
      });

    } catch (error) {
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
      const usernameExist = await this.findByUsername(updatePacienteDto.username);
      if (usernameExist) {
        duplicados["username"] = "Username já cadastrado";
      }
    }

    if (updatePacienteDto.email && updatePacienteDto.email !== pacienteAtual.email) {
      const emailExist = await this.findByEmail(updatePacienteDto.email);
      if (emailExist) {
        duplicados["email"] = "Email já cadastrado";
      }
    }

    if (updatePacienteDto.telefone && updatePacienteDto.telefone !== pacienteAtual.telefone) {
      const phoneExist = await this.findByPhone(updatePacienteDto.telefone);
      if (phoneExist) {
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

      if (!pacienteId) {
        throw new HttpException("Paciente não encontrado", HttpStatus.BAD_REQUEST)
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
