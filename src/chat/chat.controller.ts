import { Controller, Get, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { IsPublic } from "src/auth/decorators/is-public.decorator";

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @IsPublic()
    @Get('historico/:sala')
    async getHistorico(@Param('sala') sala: string) {
        return await this.chatService.obterHistorico(sala);
    }


}