import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Place } from 'src/entity/place';

@Injectable()
export class PlaceRepository extends BaseAbstractRepository<Place> {
  constructor(
    @InjectRepository(Place)
    private readonly placeRepository: Repository<Place>,
  ) {
    super(placeRepository);
  }
}
