import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule, ConfigModule.forRoot()],
  providers: [ConfigService],
})
export class AppModule {}
