import { Endereco } from "@prisma/client";
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreatePacienteDto {
    @IsNotEmpty()
    @IsString()
    cpf: string

    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    password: string

    @IsNotEmpty()
    @IsString()
    nome_completo: string

    @IsNotEmpty()
    @IsString()
    telefone: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    genero: string

    @IsNotEmpty()
    @IsString()
    grau_de_instrucao: string

    @IsNotEmpty()
    @IsDate()
    data_nascimento: Date

    @IsInt()
    @IsNotEmpty()
    idade: number

    @IsNotEmpty()
    endereco: Endereco
}
