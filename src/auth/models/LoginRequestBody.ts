import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestBody {
  @ApiProperty({example: "lukinhas312323"})
  @IsString()
  username: string;

  @ApiProperty({example: "senha123"})
  @IsString()
  password: string;
}