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
} from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlShortnerService } from './url_shortner.service';


@Controller()
export class UrlShortnerController {
  constructor(private readonly urlsService: UrlShortnerService) { }

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
    return this.urlsService.findAll(options, user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.urlsService.findOne(id);
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
