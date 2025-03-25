import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateEnfermeiroDto } from './dto/create-enfermeiro.dto';
import { UpdateEnfermeiroDto } from './dto/update-enfermeiro.dto';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { UserService } from 'src/user/user.service';

@Injectable()
export class EnfermeirosService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly userService: UserService
  ) { }

  async findByUsername(username: string) {
    return await this.prisma.enfermeiro.findUnique({
      where: {
        username: username
      }
    })
  }

  async findCoren(coren: string) {
    return await this.prisma.enfermeiro.findUnique({
      where: {
        coren: coren
      }
    })
  }

  async findByEmail(email: string) {
    return await this.prisma.enfermeiro.findUnique({
      where: {
        email: email
      }
    })
  }

  async createEnfermeiro(createEnfermeiroDto: CreateEnfermeiroDto) {
    try {

      if (!createEnfermeiroDto) {
        throw new HttpException("Preencha os campos necessários!", HttpStatus.BAD_REQUEST)
      }

      const duplicados = {};

      const corenExiste = await this.findCoren(createEnfermeiroDto.coren)

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

      await this.prisma.enfermeiro.create({
        data: {
          ...createEnfermeiroDto,
          password: await bcrypt.hash(createEnfermeiroDto.password, 10)
        }
      })
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
    return undefined;
  }

  findAll() {
    return `This action returns all enfermeiros`;
  }

  findOne(enfermeiroId: string) {
    return `This action returns a #${enfermeiroId} enfermeiro`;
  }

  async updateEnfermeiro(enfermeiroId: string, updateEnfermeiroDto: UpdateEnfermeiroDto) {
    try {
      const duplicados = {};

      const enfermeiroAtual = await this.prisma.enfermeiro.findUnique({
        where: { id: enfermeiroId },
      });

      if (!enfermeiroAtual) {
        throw new HttpException("Enfermeiro não encontrado", HttpStatus.NOT_FOUND);
      }

      if (updateEnfermeiroDto.username && updateEnfermeiroDto.username !== enfermeiroAtual.username) {
        const usernameExist = await this.userService.findUserByUsername(updateEnfermeiroDto.username);
        if (usernameExist) {
          duplicados["username"] = "Username já cadastrado";
        }
      }

      if (updateEnfermeiroDto.email && updateEnfermeiroDto.email !== enfermeiroAtual.email) {
        const emailExist = await this.userService.findEmail(updateEnfermeiroDto.email);
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

      await this.prisma.enfermeiro.update({
        where: { id: enfermeiroId },
        data: { ...updateEnfermeiroDto },
      });

    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
    }
  }

  remove(enfermeiroId: string) {
    return `This action removes a #${enfermeiroId} enfermeiro`;
  }
}
