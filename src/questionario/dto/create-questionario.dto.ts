import { IsString, IsNotEmpty, IsInt, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateAlternativaDto } from './create-alternativa.dto';

export class CreateQuestionarioDto {
    @ApiProperty({
        description: 'Pergunta do questionário',
        example: "Qual seu nível de dor?"
    })
    @IsString()
    @IsNotEmpty()
    pergunta: string;

    @ApiProperty({
        description: "Peso da pergunta",
        example: 50
    })
    @IsInt()
    @IsNotEmpty()
    peso: number;

    @ApiProperty({
        description: "Observação da pergunta",
        example: "Perguntas para triagem"
    })
    @IsString()
    @IsNotEmpty()
    observacao: string;

    @ApiProperty({
        description: "Lista de alternativas para a pergunta",
        type: [CreateAlternativaDto]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAlternativaDto)
    alternativas: CreateAlternativaDto[];
}
