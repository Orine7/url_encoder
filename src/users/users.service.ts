import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validatePassword } from '../../libs/helper/src';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto)
    const { password, ...created } = await this.usersRepository.save(newUser);
    return created;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: string) {
    return await this.usersRepository.findOneByOrFail({ id })
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ["id", "email", "password", "type",],
    });
    if (!password || !user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const passwordIsValid = validatePassword(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    })
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: string) {
    return await this.usersRepository.delete({ id });
  }
}
