import { Entity, ManyToOne } from 'typeorm';
import { InternalCourse } from '@dad-group-1/backend-common';
import { Instructor } from '../../external/entities/instructor.entity';
import { Program } from '../../programs/entities/program.entity';
import { Room } from '../../external/entities/room.entity';

@Entity()
export class Course extends InternalCourse {
  @ManyToOne(() => Instructor, (instructor) => instructor.courses)
  instructor: Instructor;
  @ManyToOne(() => Program, (program) => program.courses)
  program: Program;
  @ManyToOne(() => Room, (room) => room.courses)
  room: Room;
}
