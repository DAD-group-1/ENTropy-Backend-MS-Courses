import { Module } from '@nestjs/common';
import { ProgramTypeController } from './program-type.controller';
import { ProgramTypeService } from './program-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramType } from './entities/program-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramType])],
  controllers: [ProgramTypeController],
  providers: [ProgramTypeService],
})
export class ProgramTypeModule {}
