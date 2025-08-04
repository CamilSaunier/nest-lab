import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  // Relation ManyToOne: chaque publication appartient à un user
  @ManyToOne(() => User, (user) => user.publications, { eager: true })
  user: User;
}
