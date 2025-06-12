import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { UpdateAlternativaDto } from "./update-alternativa.dto";
import { Type } from "class-transformer";

export class UpdateQuestionarioDto {

    @ApiProperty({ example: "Sim" })
    @IsString()
    pergunta?: string

    @ApiProperty({ example: "Sim" })
    @IsString()
    peso?: number

    @ApiProperty({ example: "Sim" })
    @IsString()
    observacao?: string

    @ApiProperty({
        description: "Lista de alternativas para a pergunta",
        type: [UpdateAlternativaDto]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateAlternativaDto)
    alternativas?: {
        id: string;
        alternativa: string;
        peso: number;
    }[];
}