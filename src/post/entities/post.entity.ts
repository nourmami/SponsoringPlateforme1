import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne } from 'typeorm';
import { CommonEntity } from '../../common/common.entity';

Entity()
export class Post extends CommonEntity {


  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  title: string;

  @Column()
  caption: string;

  @Column()
  photo: string;

  
  @Column()
  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
