import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenName = process.env.SECRET_TOKEN;

    const token = request.cookies[`${tokenName}`];
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_TOKEN,
      });
      request['user'] = {
        userId: payload.sub,
        username: payload.username,
      };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
