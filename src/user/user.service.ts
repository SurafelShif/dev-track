import {
  ConflictException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AUTH_COOKIE_NAME } from 'src/common/constants';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(data: CreateUserDto) {
    await this.isNameExists(data.name);
    return await this.prisma.user.create({ data });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    await this.isIdExists(id);
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
  }
  async me(token: string) {
    console.log(token);
    const payload = await this.jwtService.decode(token);
    return { id: payload.sub, name: payload.username };
  }
  async update(id: number, data: UpdateUserDto) {
    await this.isIdExists(id);
    if (data.name) await this.isNameExists(data.name);
    return await this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.isIdExists(id);

    return await this.prisma.user.update({
      where: { id },
      data: { is_deleted: true },
    });
  }
  private async isNameExists(name: string) {
    const isExist = await this.prisma.user.findUnique({ where: { name } });
    if (isExist) throw new ConflictException('the name exists');
    return;
  }
  private async isIdExists(id: number) {
    const isExist = await this.prisma.user.findUnique({ where: { id } });

    if (!isExist || isExist.is_deleted)
      throw new NotFoundException('the user not found');
    return;
  }
}
