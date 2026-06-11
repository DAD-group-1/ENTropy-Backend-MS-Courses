import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CourseService } from './course.service';
import {
  CreateCourseRequestDto,
  PaginationQueryDto,
  UpdateCourseRequestDto,
} from '@dad-group-1/backend-common';

@Controller('courses')
export class CourseController {
  private readonly logger = new Logger(CourseController.name);
  constructor(private readonly courseService: CourseService) {}

  @MessagePattern({ cmd: 'create_course' })
  async create(@Payload() data: CreateCourseRequestDto) {
    this.logger.log('Received create course request');
    return this.courseService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_courses' })
  findAll(query: PaginationQueryDto) {
    this.logger.log('Received find all courses request');
    return this.courseService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_course' })
  findOne(@Payload() id: number) {
    this.logger.log('Received find one course request for id: ' + id);
    return this.courseService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_course' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateCourseRequestDto;
    },
  ) {
    this.logger.log('Received update course request for id: ' + payload.id);
    return this.courseService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_course' })
  remove(@Payload() id: number) {
    this.logger.log('Received remove course request for id: ' + id);
    return this.courseService.remove(id);
  }
}
