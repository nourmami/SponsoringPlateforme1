import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { BasicUser } from 'src/common/BasicUser.entity';

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

  @ManyToOne(() => BasicUser, (user) => user.posts)
  user: BasicUser;
}
