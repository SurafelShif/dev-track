import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prismaService: PrismaService) {}
  async create(data: CreateTaskDto) {
    await this.validateProjectId(data.projectId);
    return await this.prismaService.task.create({ data: data });
  }

  async findAll(projectId: number) {
    return await this.prismaService.task.findMany({
      where: { projectId, is_deleted: false },
    });
  }

  async update(id: number, data: UpdateTaskDto) {
    return await this.prismaService.task.update({ where: { id }, data });
  }

  async remove(id: number) {
    return await this.prismaService.task.update({
      data: { is_deleted: true },
      where: { id },
    });
  }
  async validateProjectId(projectId: number) {
    const project = await this.prismaService.project.findUnique({
      where: { id: projectId },
    });

    if (!project || project.is_deleted) {
      throw new NotFoundException(`Project does not exist`);
    }
  }
}
