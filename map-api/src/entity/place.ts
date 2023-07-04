import { Entity, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity('places')
export class Place {
  id: string;
  @ManyToOne(() => User, (user) => user.places, { onDelete: 'CASCADE' })
  user: User;
}
