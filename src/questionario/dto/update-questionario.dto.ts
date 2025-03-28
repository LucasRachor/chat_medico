import { PartialType } from '@nestjs/swagger';
import { CreateQuestionarioDto } from './create-questionario.dto';

export class UpdateQuestionarioDto extends PartialType(CreateQuestionarioDto) {}
