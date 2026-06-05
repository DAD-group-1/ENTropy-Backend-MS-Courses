import { InternalBuilding } from '@dad-group-1/backend-common';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Room } from './room.entity';
import { Campus } from './campus.entity';

@Entity()
export class Building extends InternalBuilding {
  @OneToMany(() => Room, (room) => room.building)
  rooms: Room[];
  @ManyToOne(() => Campus, (campus) => campus.buildings)
  campus: Campus;
}
