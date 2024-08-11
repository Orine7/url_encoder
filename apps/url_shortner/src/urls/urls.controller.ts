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
import { ApiTags } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlsService } from './urls.service';

@ApiTags('urls')
@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) { }

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
