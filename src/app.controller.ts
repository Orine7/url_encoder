import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './guards/localAuth.guard';

import { CurrentUser, Public } from '../libs/helper/src';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  login(@CurrentUser() user: User) {
    return this.appService.login(user);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
