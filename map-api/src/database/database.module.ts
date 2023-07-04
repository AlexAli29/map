import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { MapModuleConfigOptions } from 'src/config/map-module-config-options.config';
import { typeOrmModuleAsyncOptions } from 'src/config/type-orm.config';

@Module({
  imports: [
    ConfigModule.forRoot(MapModuleConfigOptions),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
  ],
})
export class DataBaseModule {}
