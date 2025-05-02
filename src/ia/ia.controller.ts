import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IaService } from './ia.service';


@Controller('ia')
export class IaController {
  constructor(private readonly iaService: IaService) { }

  @Post('ask')
  async askQuestion(@Body() body: { question: string }) {
    try {
      const response = await this.iaService.generateResponse(body.question);
      return response;
    } catch (error) {
      return {
        error: true,
        message: error.message
      };
    }
  }
}

