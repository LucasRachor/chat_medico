import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateEnfermeiroDto  {

    @ApiPropertyOptional({example: "outronome"})
    @IsString()
    username: string

    @ApiPropertyOptional({example: "outroemail@teste.com"})
    @IsString()
    email: string
}
