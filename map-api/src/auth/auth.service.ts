import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { RegisterUserDto } from './dto/register-user.dto';
import { ConfigService } from '@nestjs/config';
import { EnvVariable } from 'src/enum/env-variable.enum';
import { User } from 'src/entity/user';
import { TokenPayload } from '../interface/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async register(dto: RegisterUserDto) {
    const newUser = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    const user = await this.userRepository.save(newUser);
    const payload = { id: user.id };
    const refreshToken = await this.generateRefreshToken(payload);

    return {
      refresh_token: refreshToken,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(user: User) {
    const payload = { id: user.id };

    const refreshToken = await this.generateRefreshToken(payload);

    return {
      refresh_token: refreshToken,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async refresh(id: string) {
    const payload = { id };

    const refresh_token = await this.generateRefreshToken(payload);

    return {
      refresh_token: refresh_token,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async generateRefreshToken(payload: TokenPayload) {
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get(EnvVariable.RefreshTokenSecret),
      expiresIn: '15d',
    });

    return refreshToken;
  }
}
