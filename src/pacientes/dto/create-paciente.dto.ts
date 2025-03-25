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

    @ApiProperty({example: "lukinhas123"})
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({example: "teste123"})
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({example: "Teste Silva Rachor"})
    @IsNotEmpty()
    @IsString()
    nome_completo: string;

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
    grau_de_instrucao: string;

    @ApiProperty({example: "2025-03-25T14:06:03.655Z"})
    @IsNotEmpty()
    @IsDate()
    data_nascimento: Date;

    @ApiProperty({example: 32})
    @IsInt()
    @IsNotEmpty()
    idade: number;

    @ApiProperty({ type: EnderecoDto }) // Agora o Swagger sabe que é um objeto Endereco
    @IsNotEmpty()
    @Type(() => EnderecoDto) // Transforma corretamente o JSON recebido
    endereco: EnderecoDto;
}
