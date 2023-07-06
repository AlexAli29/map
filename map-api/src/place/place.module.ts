import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from 'src/config/jwt.config';

import { DataBaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user';
import { Place } from 'src/entity/place';
import { UserRepository } from 'src/repositories/user.repository';
import { AccessTokenStrategy } from 'src/auth/strategies/access-token.strategy';
import { PlaceService } from './place.service';
import { RefreshTokenStrategy } from 'src/auth/strategies/refresh-token.strategy';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { PlaceController } from './place.controller';
import { PlaceRepository } from 'src/repositories/place.repository';

@Module({
  controllers: [PlaceController],
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    DataBaseModule,
    TypeOrmModule.forFeature([User, Place]),
    PassportModule,
  ],
  providers: [
    ConfigService,
    PlaceService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    UserRepository,
    PlaceRepository, // UserRepository has been moved to providers
  ],
})
export class PlaceModule {}
