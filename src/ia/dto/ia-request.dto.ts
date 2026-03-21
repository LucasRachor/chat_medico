import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class IaRequestDto {
  @IsString()
  @IsNotEmpty()
  mensagem: string;

  @IsString()
  @IsNotEmpty()
  nome_paciente: string;

  @IsBoolean()
  @IsNotEmpty()
  final: boolean;

  @IsNumber()
  @IsNotEmpty()
  num_mensagens: number;
}
