import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Place } from 'src/entity/place';
import { User } from 'src/entity/user';
import { EnvVariable } from 'src/enum/env-variable.enum';

export const typeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    type: configService.get<string>(EnvVariable.DataBaseType) as 'postgres',
    host: configService.get<string>(EnvVariable.DataBaseHost),
    port: configService.get<number>(EnvVariable.DataBasePort),
    username: configService.get<string>(EnvVariable.DataBaseUserName),
    password: configService.get<string>(EnvVariable.DataBasePassword),
    database: configService.get<string>(EnvVariable.DataBaseName),
    entities: [User, Place],
    synchronize: true,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  }),
  inject: [ConfigService],
};
