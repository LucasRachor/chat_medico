import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateEnfermeiroDto {

    @ApiProperty({
        description: 'o nome de usuário do enfermeiro',
        example: 'testeEnfermeiro'
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        description: 'a senha de login do enfermeiro',
        example: 'senha123'
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        description: 'o nome completo do enfermeiro',
        example: 'Teste Silva Oliveira'
    })
    @IsNotEmpty()
    @IsString()
    nomeCompleto: string;

    @ApiProperty({
        description: 'o coren do enfermeiro',
        example: 'COREN-AM 123.456-ENF'
    })
    @IsNotEmpty()
    @IsString()
    coren: string;

    @ApiProperty({
        description: 'o email do enfermeiro',
        example: 'teste@gmail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}
