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
    return this.courseService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_courses' })
  findAll(query: PaginationQueryDto) {
    return this.courseService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_course' })
  findOne(@Payload() id: number) {
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
    return this.courseService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_course' })
  remove(@Payload() id: number) {
    return this.courseService.remove(id);
  }
}
