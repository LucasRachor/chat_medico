import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsDate, IsArray } from 'class-validator';

export class UpdateChatDto {
  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsOptional()
  @IsString()
  pacienteId?: string;

  @ApiPropertyOptional({ example: '123e4567-e89b-12d3-a456-426614174001' })
  @IsOptional()
  @IsString()
  medicoId?: string;

  @ApiPropertyOptional({ example: '2024-03-25T14:30:00Z' })
  @IsOptional()
  @IsDate()
  dataAtendimento?: Date;

  @ApiPropertyOptional({ 
    example: [
      { remetenteId: '123e4567-e89b-12d3-a456-426614174000', mensagem: 'Olá doutor', dataEnvio: '2024-03-25T14:30:00Z' }
    ] 
  })
  @IsOptional()
  @IsArray()
  mensagens?: Array<{
    remetenteId: string;
    mensagem: string;
    dataEnvio: Date;
  }>;
}
