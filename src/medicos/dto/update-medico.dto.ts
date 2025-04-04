import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
export class UpdateMedicoDto {

    @IsString()
    @ApiProperty()
    username: string

    @IsString()
    @ApiProperty()
    email: string

}
