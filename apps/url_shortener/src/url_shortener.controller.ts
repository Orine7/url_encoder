import { CurrentUser, JWTUser, Public, pageOptions } from '@app/helper';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlShortenerService } from './url_shortener.service';


@Controller()
export class UrlShortenerController {
  constructor(private readonly urlsService: UrlShortenerService) { }

  @Public("readonly")
  @Post()
  create(@Body() createUrlDto: CreateUrlDto, @CurrentUser() user: JWTUser) {
    return this.urlsService.create(createUrlDto, user);
  }

  @Public("readonly")
  @Get()
  findAll(
    @Query() options: pageOptions,
    @CurrentUser() user?: JWTUser
  ) {
    return this.urlsService.findAll(new pageOptions(options), user);
  }

  @Public("readonly")
  @Get('/byId/:id')
  async getUrlById(@Param('id') id: string) {
    return this.urlsService.findOne(id);
  }

  @Public("readonly")
  @Get('/:shortUrl')
  async redirectUrl(
    @Param('shortUrl') shortUrl: string,
    @CurrentUser() user: JWTUser,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const url = await this.urlsService.getUrlByShortUrl(shortUrl);

    if (url) {
      await this.urlsService.createUrlAccess(url, req.ip, user);
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).send('URL not found');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlsService.update(id, updateUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.urlsService.remove(id);
  }
}
