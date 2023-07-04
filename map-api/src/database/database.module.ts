import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleAsyncOptions } from 'src/config/type-orm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions)],
})
export class DataBaseModule {}
