import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BaseExceptionFilter } from '../../../libs/helper/src';
import { UrlShortenerModule } from './url_shortener.module';

async function bootstrap() {
  const app = await NestFactory.create(UrlShortenerModule);

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new BaseExceptionFilter(configService));

  const config = new DocumentBuilder()
    .setTitle('Url Shortener API')
    .setDescription('Cool docs bro.')
    .setVersion('0.5')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService?.get('PORT') ?? 3000);
}
bootstrap();
