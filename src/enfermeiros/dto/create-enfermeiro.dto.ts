import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class CreateEnfermeiroDto {
    @ApiProperty({example: "lilkinhas123"})
    @IsString()
    username: string

    @ApiProperty({example: "senha123"})
    @IsString()
    password: string

    @ApiProperty({example: "Lucas Silva Castelo Branco"})
    @IsString()
    nome_completo: string

    @ApiProperty({example: "Coren-AM 123.456-ENF"})
    @IsString()
    coren: string

    @ApiProperty({example: "lilkas@teste.com"})
    @IsString()
    email: string
}
