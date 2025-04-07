import { IsString, IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlternativaDto {
  @ApiProperty({ example: "Sim" })
  @IsString()
  @IsNotEmpty()
  alternativa: string;

  @ApiProperty({ example: 50 })
  @IsInt()
  @IsNotEmpty()
  peso: number;
}
