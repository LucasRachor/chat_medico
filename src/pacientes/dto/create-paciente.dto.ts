import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";

// DTO para o endereço
class EnderecoDto {
    @ApiProperty({ example: "Rua das Flores" })
    @IsNotEmpty()
    @IsString()
    rua: string;

    @ApiProperty({ example: 43 })
    @IsNotEmpty()
    @IsString()
    numero: number

    @ApiProperty({ example: "Centro" })
    @IsNotEmpty()
    @IsString()
    bairro: string;

    @ApiProperty({ example: "São Paulo" })
    @IsNotEmpty()
    @IsString()
    cidade: string;

    @ApiProperty({ example: "SP" })
    @IsNotEmpty()
    @IsString()
    estado: string;

    @ApiProperty({ example: "12345-678" })
    @IsNotEmpty()
    @IsString()
    cep: string;
}

// DTO para Paciente
export class CreatePacienteDto {
    @ApiProperty({example: "075.334.123-49"})
    @IsNotEmpty()
    @IsString()
    cpf: string;

    @ApiProperty({example: "testePaciente"})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({example: "senha123"})
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({example: "Teste Paciente Junior"})
    @IsNotEmpty()
    @IsString()
    nomeCompleto: string;

    @ApiProperty({example: "(92) 00000-0000"})
    @IsNotEmpty()
    @IsString()
    telefone: string;

    @ApiProperty({example: "teste@teste.com"})
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({example: "Masculino"})
    @IsNotEmpty()
    @IsString()
    genero: string;

    @ApiProperty({example: "Educação Básica"})
    @IsNotEmpty()
    @IsString()
    grauDeInstrucao: string;

    @ApiProperty({example: "2025-03-25T14:06:03.655Z"})
    @IsNotEmpty()
    @IsDate()
    dataNascimento: Date;

    @ApiProperty({example: 32})
    @IsInt()
    @IsNotEmpty()
    idade: number;

    @ApiProperty({ type: EnderecoDto })
    @IsNotEmpty()
    @Type(() => EnderecoDto)
    endereco: EnderecoDto;
}
