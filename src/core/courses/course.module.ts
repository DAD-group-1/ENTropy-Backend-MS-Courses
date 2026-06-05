import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { Instructor } from '../external/entities/instructor.entity';
import { Program } from '../programs/entities/program.entity';
import { Room } from '../external/entities/room.entity';
import { Building } from '../external/entities/building.entity';
import { User } from '../external/entities/user.entity';
import { ProgramType } from '../program-types/entities/program-type.entity';
import { Campus } from '../external/entities/campus.entity';
import { Department } from '../external/entities/department.entity';
import { RoomType } from '../external/entities/room-type.entity';
import { Specialization } from '../external/entities/specialization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Course,
      Building,
      Campus,
      Department,
      Instructor,
      Room,
      RoomType,
      Specialization,
      Program,
      ProgramType,
      User,
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
