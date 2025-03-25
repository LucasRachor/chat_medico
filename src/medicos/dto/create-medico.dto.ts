import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"

export class CreateMedicoDto {

    @IsString()
    @ApiProperty()
    username: string

    @IsString()
    @ApiProperty()
    password: string

    @IsString()
    @ApiProperty()
    nome_completo: string

    @IsString()
    @ApiProperty()
    CRM: string

    @IsString()
    @ApiProperty()
    email: string


}
