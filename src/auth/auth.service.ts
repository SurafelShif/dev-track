import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './signin.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signIn(data: SignInDto) {
    const { name, password } = data;
    const user = await this.prisma.user.findFirst({ where: { name } });
    if (!user) return new ConflictException('user not found');
    if (password !== user.password)
      throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, username: user.name };
    const cookieValue = await this.jwtService.signAsync(payload);
    return cookieValue;
  }
}
