import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user';

@Entity('places')
export class Place {
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => User, (user) => user.places, { onDelete: 'CASCADE' })
  user?: User;
}
