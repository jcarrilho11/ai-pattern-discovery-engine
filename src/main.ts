import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('AI Pattern Discovery Engine')
    .setDescription('API for discovering patterns in datasets using statistics, K-Means clustering, and LLM insights')
    .setVersion('1.0')
    .addTag('patterns')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  logger.log(`Application running on http://localhost:${port}`);
  logger.log(`Swagger documentation available at http://localhost:${port}/api`);
  logger.log(`POST /patterns endpoint ready`);
}

bootstrap();
