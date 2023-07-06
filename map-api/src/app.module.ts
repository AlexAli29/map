import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PlaceModule } from './place/place.module';

@Module({
  imports: [AuthModule, PlaceModule, ConfigModule.forRoot()],
  providers: [ConfigService],
})
export class AppModule {}
