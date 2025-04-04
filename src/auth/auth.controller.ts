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

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyToken(@Request() req) {
    return {
      message: 'Token is valid',
      user: req.user,
    };
  }
}