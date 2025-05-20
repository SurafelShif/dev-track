import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    PrismaModule,
    AuthModule,
    JwtModule.register({ global: true, secret: process.env.SECRET_TOKEN }),
    ProjectsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {}
