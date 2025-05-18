import { Injectable, NotFoundException } from '@nestjs/common';
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
      where: { userId: userId, is_deleted: false },
    });
  }

  async findOne(id: number) {
    const project = await this.validateId(id);

    return project;
  }

  async update(id: number, data: CreateProjectDto) {
    await this.validateId(id);

    return this.prismaService.project.update({
      data,
      where: { id },
    });
  }

  async remove(id: number) {
    const project = await this.validateId(id);
    console.log(project);

    return this.prismaService.project.update({
      data: { is_deleted: true },
      where: { id },
    });
  }

  async validateId(id: number) {
    const isExists = await this.prismaService.project.findUnique({
      where: { id },
    });
    if (!isExists || isExists.is_deleted)
      throw new NotFoundException('project not found');
    return isExists;
  }
}
