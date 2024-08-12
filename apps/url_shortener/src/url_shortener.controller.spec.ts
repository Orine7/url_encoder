import { Test, TestingModule } from '@nestjs/testing';
import { UrlshortenerController } from './url_shortener.controller';
import { UrlshortenerService } from './url_shortener.service';

describe('UrlshortenerController', () => {
  let urlshortenerController: UrlshortenerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UrlshortenerController],
      providers: [UrlshortenerService],
    }).compile();

    urlshortenerController = app.get<UrlshortenerController>(UrlshortenerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {

    });
  });
});
