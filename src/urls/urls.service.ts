import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JWTUser } from '../../libs/helper/src';
import { pageOptions } from '../../libs/helper/src/types/genericOptions.type';
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

  async findAll(options: pageOptions, currentUser?: JWTUser) {
    const [urls, totalurls] = await this.urlRepository.findAndCount({
      where: [
        { isPublic: true, deletedAt: null },
        {
          creator: currentUser ? { id: currentUser.id } : undefined
        }],
      relations: {
        accesses: true,
        creator: true
      },
      order: {
        createdAt: options.order
      },
      take: options.size,
      skip: options.page * options.size
    });
    const urlCounts = urls.reduce((acc, url) => {
      acc[url.shortUrl] = url.accesses.length;
      return acc
    });
    return { urls, totalurls, urlCounts };
  }

  findOne(id: string) {
    return this.urlRepository.findOneBy({ id });
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

  async update(id: string, updateUrlDto: UpdateUrlDto) {
    const user = await this.urlRepository.preload({
      id: id,
      ...updateUrlDto,
    })
    if (!user) {
      throw new Error(`Could not find url with id ${id}`);
    }
    return await this.urlRepository.save(user);
  }

  remove(id: string) {
    return this.urlRepository.delete({ id });
  }
}
