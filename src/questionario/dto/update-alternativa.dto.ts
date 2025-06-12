import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class UpdateAlternativaDto {

    @ApiProperty({ example: "aosudhiasdhsauhdsa" })
    @IsString()
    id: string

    @ApiProperty({ example: "Sim" })
    @IsString()
    alternativa?: string;

    @ApiProperty({ example: 50 })
    @IsInt()
    peso?: number;
}