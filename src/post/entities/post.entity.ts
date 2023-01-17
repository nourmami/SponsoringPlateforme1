import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BasicUser } from 'src/common/BasicUser.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  caption: string;

  @Column()
  photo: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
