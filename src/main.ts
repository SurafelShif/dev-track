import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Prefix all routes with /api
  app.setGlobalPrefix('api');

  // Start the applicatio
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
