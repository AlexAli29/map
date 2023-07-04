import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { User } from 'src/entity/user';

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
