import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { SignInDto } from './signin.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInData: SignInDto, @Res() response: Response) {
    const cookie = await this.authService.signIn(signInData);
    response.cookie('' + process.env.SECRET_TOKEN, cookie, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return response.send({ message: 'login succeeded' });
  }
}
