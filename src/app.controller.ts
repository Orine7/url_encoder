import { Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from "express";

import { AppService } from './app.service';
import { LocalAuthGuard } from './guards/localAuth.guard';

import { CurrentUser, Public } from '../libs/helper/src';
import { UrlsService } from './urls/urls.service';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService,
    private readonly urlService: UrlsService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(@CurrentUser() user: User) {
    return this.appService.login(user);
  }

  @Public("readonly")
  @Get('/:shortUrl')
  async redirectUrl(
    @Param('shortUrl') shortUrl: string,
    @CurrentUser() user: User,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const url = await this.urlService.getUrlByShortUrl(shortUrl);

    if (url) {
      await this.urlService.createUrlAccess(url, req.ip, user);
      return res.redirect(url.originalUrl);
    } else {
      return res.status(404).send('URL not found');
    }
  }
}
