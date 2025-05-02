import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IaService {
  constructor(private readonly httpService: HttpService) { }

  async generateResponse(question: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('https://api-ia-371813454251.us-central1.run.app/generate/', {
          request: question
        })
      );
      return response.data;
    } catch (error) {
      throw new Error('Erro ao gerar resposta da IA: ' + error.message);
    }
  }
}
