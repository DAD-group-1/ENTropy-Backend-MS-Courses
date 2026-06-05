import { Entity, ManyToOne, OneToOne } from 'typeorm';
import { InternalUser } from '@dad-group-1/backend-common';
import { Instructor } from './instructor.entity';
import { Campus } from './campus.entity';

@Entity()
export class User extends InternalUser {
  @OneToOne(() => Instructor, (instructor) => instructor.user)
  instructor: Instructor;
  @ManyToOne(() => Campus, (campus) => campus.users)
  campus: Campus;
}
