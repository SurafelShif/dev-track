import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateProjectDto, userId: number) {
    return await this.prismaService.project.create({
      data: { ...data, userId },
    });
  }

  async findAll(userId: number) {
    return await this.prismaService.project.findMany({
      where: { userId: userId },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
