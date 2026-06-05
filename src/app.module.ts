import { Module } from '@nestjs/common';
import { CourseModule } from './core/courses/course.module';
import { ProgramModule } from './core/programs/program.module';
import { ProgramTypeModule } from './core/program-types/program-type.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CourseModule, ProgramModule, ProgramTypeModule],
})
export class AppModule {}
