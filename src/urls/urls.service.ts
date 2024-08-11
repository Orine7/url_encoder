import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JWTUser } from '../../libs/helper/src';
import { User } from '../users/entities/user.entity';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { UrlAccess } from './entities/access.entity';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlsService {

  constructor(
    @InjectRepository(Url)
    private readonly urlRepository: Repository<Url>,
    @InjectRepository(UrlAccess)
    private readonly urlAccessRepository: Repository<UrlAccess>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }
  async create(createUrlDto: CreateUrlDto, currentUser?: JWTUser) {
    const newUrl = this.urlRepository.create({
      ...createUrlDto,
      creator: currentUser ? await this.userRepository.findOne({ where: { id: createUrlDto.userId } }) : undefined,
      shortUrl: Math.random().toString(36).substring(2, 8),
    });
    return await this.urlRepository.save(newUrl);
  }

  findAll() {
    return `This action returns all urls`;
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  getUrlByShortUrl(shortUrl: string) {
    return this.urlRepository.findOneBy({ shortUrl });
  }
  async createUrlAccess(url: Url, ip: string, currentUser?: JWTUser) {
    const newAccess = this.urlAccessRepository.create({
      url,
      ipAddress: ip,
      user: currentUser ? await this.userRepository.findOne({ where: { id: currentUser.id } }) : undefined,
    })
    return this.urlAccessRepository.save(newAccess);
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
