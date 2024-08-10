import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { number, object, string } from 'joi';
import { connectionOptions } from '../libs/helper/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsModule } from './urls/urls.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    UrlsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: object({
        JWT_SECRET: string().required(),
        JWT_EXPIRATION: string().required(),
        ENVIRONMENT: string().required(),
        DATABASE_PORT: number().required(),
        POSTGRES_HOST: string().required(),
        POSTGRES_PASSWORD: string().required(),
        POSTGRES_USER: string().required(),
        POSTGRES_DB: string().required(),
      }),
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(connectionOptions()),
    PassportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
