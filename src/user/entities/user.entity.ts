import { Entity,  JoinTable,  ManyToMany   } from 'typeorm';
import { BasicUser } from 'src/common/BasicUser.entity';
import { Sponsor }  from 'src/sponsor/entities/sponsor.entity';



@Entity()
export class User extends BasicUser {
  
  @ManyToMany(() => Sponsor, (sponsor) => sponsor.sponsorings)
  @JoinTable()
  sponsors: Sponsor[];

  
}
