import { IsString, IsNotEmpty, IsInt, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Alternativa } from '@prisma/client';

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
        example: 10
    })
    @IsInt()
    @IsNotEmpty()
    peso: number;

    @ApiProperty({
        description: "Observação da pergunta",
        example: "(Pergunta eleminatória)"
    })
    @IsString()
    @IsNotEmpty()
    observacao: string

    @ApiProperty({
        description: "Alternativas da pergunta (precisa ser um array de objetos com as propriedades alternativa e peso)",
        example: "[{alternativa: 'Dor leve', peso: 10}, {alternativa: 'Dor moderada', peso: 20}, {alternativa: 'Dor grave', peso: 30}]"
    })
    @IsArray()
    @IsNotEmpty()
    alternativas: Alternativa[]
}
