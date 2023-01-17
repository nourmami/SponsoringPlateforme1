import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from 'src/common/common.entity';

@Entity()
export class Post extends CommonEntity {
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
