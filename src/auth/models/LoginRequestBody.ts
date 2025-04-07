import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestBody {
  @ApiProperty({
    description: "Este login é com a role paciente, para médico: testemedico, teste",
    example: "teste"
  })
  @IsString()
  username: string;

  @ApiProperty({example: "teste"})
  @IsString()
  password: string;
}