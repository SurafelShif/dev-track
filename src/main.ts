import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.use(cookieParser());

  // Prefix all routes with /api
  app.setGlobalPrefix('api');

  // Start the applicatio
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
