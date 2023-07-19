import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repositories/user.repository';
import { PlaceDto } from './dto/place.dto';
import { User } from 'src/entity/user';
import { PlaceRepository } from 'src/repositories/place.repository';

@Injectable()
export class PlaceService {
  constructor(
    private readonly placeRepository: PlaceRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async togglePlace(dto: PlaceDto, user: User) {
    const place = this.placeRepository.create(dto);
    const placeFormDb = await this.placeRepository.findByCondition({
      where: { id: dto.id },
    });
    if (placeFormDb) {
      await this.placeRepository.remove(place);
    } else {
      try {
        user.places.push(place);
        await this.userRepository.save(user);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
