import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Optional: makes PrismaService available app-wide
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // <-- this is important!
})
export class PrismaModule {}
