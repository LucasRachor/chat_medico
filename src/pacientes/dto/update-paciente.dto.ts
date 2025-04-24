import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdatePacienteDto {
    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    telefone?: string

    @ApiProperty()
    @ApiPropertyOptional()
    @IsEmail()
    email?: string

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    grau_de_instrucao?: string

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    username?: string

    @ApiProperty()
    @ApiPropertyOptional()
    @IsString()
    password?: string
}
