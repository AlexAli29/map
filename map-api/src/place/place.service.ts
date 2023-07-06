import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';

import { ConfigService } from '@nestjs/config';
import { PlaceDto } from './dto/place.dto';
import { User } from 'src/entity/user';
import { PlaceRepository } from 'src/repositories/place.repository';

@Injectable()
export class PlaceService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly placeRepository: PlaceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async addPlace(dto: PlaceDto, user: User) {
    const place = this.placeRepository.create(dto);
    user.places.push(place);
    await this.userRepository.save(place);
  }

  async removePlace(id: string) {
    await this.placeRepository.remove({ id: id });
  }
}
