import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { InternalInstructor } from '@dad-group-1/backend-common';
import { User } from './user.entity';
import { Department } from './department.entity';
import { Course } from '../../courses/entities/course.entity';
import { Specialization } from './specialization.entity';

@Entity()
export class Instructor extends InternalInstructor {
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @ManyToOne(() => Department, (department) => department.instructors)
  department: Department;
  @OneToMany(() => Course, (course) => course.instructor)
  courses: Course[];
  @ManyToOne(
    () => Specialization,
    (specialization) => specialization.instructors,
  )
  specialization: Specialization;
}
