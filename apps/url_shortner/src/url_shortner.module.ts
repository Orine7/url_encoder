import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { connectionOptions } from '../../../libs/helper/src';
import { UrlShortnerController } from './url_shortner.controller';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [
    UrlsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        ENVIRONMENT: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      }),
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(connectionOptions()),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: `60m`,
        },
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [UrlShortnerController],
  providers: [UrlShortnerController],
})
export class UrlShortnerModule { }
