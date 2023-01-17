import { Entity, JoinTable, ManyToMany,  } from 'typeorm';
import { BasicUser } from 'src/common/BasicUser.entity';
import { User }  from 'src/user/entities/user.entity';



@Entity()
export class Sponsor extends BasicUser {

    @ManyToMany(() => User, (user) => user.sponsors)
    @JoinTable()
    sponsorings : User[];

    
}
