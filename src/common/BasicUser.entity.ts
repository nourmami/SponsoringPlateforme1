import { Exclude } from 'class-transformer';
import { Message } from 'src/chat/entities/message.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Post } from 'src/post/entities/post.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  CreateDateColumn,
  ManyToMany,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class BasicUser {
  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role: string;

  @Column({ nullable: true })
  fullname: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ nullable: true })
  coverPicture: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
