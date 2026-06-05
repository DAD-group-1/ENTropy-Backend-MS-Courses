import { InternalCampus } from '@dad-group-1/backend-common';
import { Entity, OneToMany } from 'typeorm';
import { Room } from './room.entity';
import { Building } from './building.entity';
import { User } from './user.entity';

@Entity()
export class Campus extends InternalCampus {
  @OneToMany(() => Room, (room) => room.campus)
  rooms: Room[];
  @OneToMany(() => Building, (building) => building.campus)
  buildings: Building[];
  @OneToMany(() => User, (user) => user.campus)
  users: User[];
}
