import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity('places')
export class Place {
  @PrimaryColumn('varchar')
  id: string;
  @ManyToOne(() => User, (user) => user.places, { onDelete: 'CASCADE' })
  user?: User;
}
