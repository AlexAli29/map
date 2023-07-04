import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { PassportModule } from '@nestjs/passport';
import { getJWTConfig } from 'src/config/jwt.config';
import { AuthService } from './auth.service';
import { DataBaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user';
import { Place } from 'src/entity/place';
import { UserRepository } from 'src/repositories/user.repository';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
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
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    LocalStrategy,
    UserRepository, // UserRepository has been moved to providers
  ],
})
export class AuthModule {}
