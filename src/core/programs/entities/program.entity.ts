import { Entity, OneToMany } from 'typeorm';
import { InternalProgram } from '@dad-group-1/backend-common';
import { Course } from '../../courses/entities/course.entity';
import { ProgramType } from '../../program-types/entities/program-type.entity';

@Entity()
export class Program extends InternalProgram {
  @OneToMany(() => Course, (course) => course.program_id)
  courses: Course[];
  @OneToMany(() => ProgramType, (programType) => programType.id)
  programTypes: ProgramType[];
}
