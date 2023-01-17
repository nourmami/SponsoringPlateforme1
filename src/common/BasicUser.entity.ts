import { Exclude } from 'class-transformer';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Post } from 'src/post/entities/post.entity';
import {Entity,Column,PrimaryGeneratedColumn,UpdateDateColumn,DeleteDateColumn,CreateDateColumn,ManyToMany,OneToMany,JoinTable,} from 'typeorm';

export class BasicUser {
  @CreateDateColumn({ update: false })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @PrimaryGeneratedColumn('uuid')
  id: number;

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

  @ManyToMany(() => BasicUser, (user) => user.followers)
  @JoinTable()
  following: BasicUser[];

  @ManyToMany(() =>BasicUser, (user) => user.following)
  @JoinTable()
  followers: BasicUser[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];


    

}
