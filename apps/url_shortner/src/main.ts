import { NestFactory } from '@nestjs/core';
import { UrlShortnerModule } from './url_shortner.module';

async function bootstrap() {
  const app = await NestFactory.create(UrlShortnerModule);
  await app.listen(3000);
}
bootstrap();
