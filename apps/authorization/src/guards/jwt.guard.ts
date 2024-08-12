import { IS_PUBLIC_KEY } from '@app/helper';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<string>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic == 'true') {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authToken = this.extractTokenFromHeader(request, isPublic);

    try {
      const user = authToken ? this.jwtService.verify(authToken) : undefined;
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token not valid');
    }
  }

  private extractTokenFromHeader(
    request: Request,
    isPublic?: string,
  ): string | undefined {
    const authToken = request.headers['authorization'];
    if (!authToken && isPublic == 'true') {
      throw new UnauthorizedException('Token not found');
    }
    const [type, token] = authToken?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
