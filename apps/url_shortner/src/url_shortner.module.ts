import { Module } from '@nestjs/common';
import { UrlShortnerController } from './url_shortner.controller';

@Module({
  imports: [],
  controllers: [UrlShortnerController],
  providers: [UrlShortnerController],
})
export class UrlShortnerModule { }
