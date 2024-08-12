import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { User } from '../../../../apps/authorization/src/users/entities/user.entity';
import { UrlAccess } from '../../../../apps/url_shortener/src/entities/access.entity';
import { Url } from '../../../../apps/url_shortener/src/entities/url.entity';

export const entitiesMap: { AUTH: Function[]; shortener: Function[] } = {
  AUTH: [User, Url, UrlAccess],
  shortener: [User, Url, UrlAccess],
};

//** Database Config. This database configuration serves only to migrations, seeds and things outside the application */
const postgreConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.DATABASE_PORT) || 5433,
  entities: entitiesMap[process.env.SERVICE],
  namingStrategy: new SnakeNamingStrategy(),
  synchronize: process.env.ENVIRONMENT !== 'PRODUCTION',
};
const postgresDS = new DataSource(postgreConfig);
postgresDS.initialize();
export default postgresDS;

//** Database Config. This connection options will/should be run with TypeormAsync function */
export function connectionOptions(): TypeOrmModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const infos = {
        type: 'postgres',
        autoLoadEntities: true,
        host: configService.get('POSTGRES_HOST'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        port: parseInt(configService.get('DATABASE_PORT')),
        entities: entitiesMap[configService.get('SERVICE')],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: configService.get('ENVIRONMENT') !== 'PRODUCTION',
      };
      return infos as TypeOrmModuleOptions;
    },
  };
}
