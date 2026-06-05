import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  CourseListResponseDto,
  CourseResponseDto,
  CreateCourseRequestDto,
  PaginationQueryDto,
  UpdateCourseRequestDto,
} from '@dad-group-1/backend-common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CourseService {
  private readonly logger = new Logger(CourseService.name);

  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createData: CreateCourseRequestDto): Promise<CourseResponseDto> {
    const course = this.courseRepository.create({ ...createData });
    try {
      return await this.courseRepository.save(course);
    } catch (error) {
      this.logger.error(
        `${error.constructor.name}: Failed to create course record - ${error.message}`,
        error.stack,
      );
      throw new RpcException({
        message: `Failed to create course record`,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: PaginationQueryDto): Promise<CourseListResponseDto> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.courseRepository.findAndCount({
      relations: {},
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new CourseListResponseDto(data, total, page, limit);
  }

  async findOne(id: number): Promise<CourseResponseDto | null> {
    const course = await this.courseRepository.findOne({
      where: { id: id },
      relations: { instructor: true, program: true, room: true },
    });

    if (!course) {
      throw new RpcException({
        message: `Course with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return course;
  }

  async update(
    id: number,
    updateData: UpdateCourseRequestDto,
  ): Promise<CourseResponseDto | null> {
    const course = await this.courseRepository.findOne({
      where: { id: id },
    });
    if (!course) {
      this.logger.error(`Course with ID ${id} not found for update`);
      throw new RpcException({
        message: `Course with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.courseRepository.merge(course, updateData);
    return await this.courseRepository.save(course);
  }

  async remove(id: number): Promise<CourseResponseDto | null> {
    const course = await this.courseRepository.findOne({
      where: { id: id },
    });
    if (!course) {
      this.logger.error(`Course with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `Course with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.courseRepository.remove(course);
    return course;
  }
}
