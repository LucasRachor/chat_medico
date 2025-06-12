import { Controller, Post, Body, SetMetadata } from '@nestjs/common';
import { IaService } from './ia.service';


@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) { }

  @SetMetadata('role', ['paciente'])
  @Post('ask')
  async askQuestion(@Body() body: { question: string }) {
    try {

      return await this.iaService.generateResponse(body.question);
    } catch (error) {
      return {
        error: true,
        message: error.message
      };
    }
  }
}

