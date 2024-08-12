import { JWTUser } from '@app/helper';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/entities/user.entity';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) { }
  getHello(): string {
    return 'Hello World!';
  }
  login(user: User) {
    const payload: JWTUser = {
      id: user.id,
      email: user.email,
      type: user.type,
      name: user.name
    }
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
