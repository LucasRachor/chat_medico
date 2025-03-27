import { ApiProperty } from "@nestjs/swagger"
import { Role } from "@prisma/client"
import { IsString } from "class-validator"

export class CreateMedicoDto {

    @IsString()
    @ApiProperty({example: "lukinhas223"})
    username: string

    @IsString()
    @ApiProperty({example: "senha123"})
    password: string

    @IsString()
    @ApiProperty({example: "Lucas Silva Rachor"})
    nome_completo: string

    @IsString()
    @ApiProperty({example: "CRM/AM 123456"})
    CRM: string

    @IsString()
    @ApiProperty({example: "lukinhas@corp.com"})
    email: string

}
