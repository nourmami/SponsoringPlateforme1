import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {CommonEntity} from '../../common/common.entity';
import { Exclude } from 'class-transformer';
import { UserRoleEnum } from '../../enums/user-role.enum';


@Entity()
export class User extends CommonEntity{
    
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({unique: true})
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
    default: UserRoleEnum.USER
  })
  role: string;
  

  
}

