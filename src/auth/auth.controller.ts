import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/LocalAuth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { JwtAuthGuard } from './guards/JwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  // Endpoint para verificar se o token é válido
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verifyToken(@Request() req) {
    // Se o token for válido, a requisição passará por aqui
    return {
      message: 'Token is valid',
      user: req.user, // O usuário decodificado do token será incluído aqui
    };
  }
}