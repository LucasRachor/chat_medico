import { Controller, Post, Body, SetMetadata } from '@nestjs/common';
import { IaService } from './ia.service';
import { IaRequestDto } from './dto/ia-request.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) {}

  @SetMetadata('role', 'paciente')
  @Post('ask')
  async askQuestion(
    @CurrentUser('id') userId: string,
    @Body() body: IaRequestDto,
  ) {
    try {
      return await this.iaService.generateResponse(userId, body);
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
