import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { Resposta } from "@prisma/client"

export class CreateAtendimentoDto {
    @IsString()
    @IsNotEmpty()
    tipoAtendimento: string

    @IsString()
    @IsNotEmpty()
    pacienteId: string

    @IsString()
    @IsNotEmpty()
    temperatura: string

    @IsString()
    @IsNotEmpty()
    pressaoArterial: string

    @IsArray()
    @IsNotEmpty()
    respostas?: Resposta[]
}
