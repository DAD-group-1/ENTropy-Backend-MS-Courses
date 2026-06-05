import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { InternalRoom } from '@dad-group-1/backend-common';
import { Building } from './building.entity';
import { Course } from '../../courses/entities/course.entity';
import { Campus } from './campus.entity';
import { RoomType } from './room-type.entity';

@Entity()
export class Room extends InternalRoom {
  @ManyToOne(() => Building, (building) => building.rooms)
  building: Building;
  @OneToMany(() => Course, (course) => course.room)
  courses: Course[];
  @ManyToOne(() => Campus, (campus) => campus.rooms)
  campus: Campus;
  @ManyToOne(() => RoomType, (roomType) => roomType.rooms)
  roomType: RoomType;
}
