import { Controller, Get } from '@nestjs/common';
import { UrlShortnerService } from './url_shortner.service';

@Controller()
export class UrlShortnerController {
  constructor(private readonly urlShortnerService: UrlShortnerService) { }

  @Get()
  getHello(): string {
    return this.urlShortnerService.getHello();
  }
}
