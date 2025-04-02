import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsArray } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsNotEmpty()
  @IsString()
  pacienteId: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsNotEmpty()
  @IsString()
  medicoId: string;

  @ApiProperty({ example: '2024-03-25T14:30:00Z' })
  @IsNotEmpty()
  @IsDate()
  dataAtendimento: Date;

  @ApiProperty({ 
    example: [
      { remetenteId: '123e4567-e89b-12d3-a456-426614174000', mensagem: 'Olá doutor', dataEnvio: '2024-03-25T14:30:00Z' },
      { remetenteId: '123e4567-e89b-12d3-a456-426614174001', mensagem: 'Olá, como posso ajudar?', dataEnvio: '2024-03-25T14:30:05Z' }
    ] 
  })
  @IsNotEmpty()
  @IsArray()
  mensagens: Array<{
    remetenteId: string;
    mensagem: string;
    dataEnvio: Date;
  }>;
}
