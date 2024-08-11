import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortnerController } from './url_shortner.controller';
import { UrlShortnerService } from './url_shortner.service';

describe('UrlShortnerController', () => {
  let urlShortnerController: UrlShortnerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UrlShortnerController],
      providers: [UrlShortnerService],
    }).compile();

    urlShortnerController = app.get<UrlShortnerController>(UrlShortnerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {

    });
  });
});
