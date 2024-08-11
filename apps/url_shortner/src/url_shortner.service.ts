import { Injectable } from '@nestjs/common';

@Injectable()
export class UrlShortnerService {
  getHello(): string {
    return 'Hello World!';
  }
}
