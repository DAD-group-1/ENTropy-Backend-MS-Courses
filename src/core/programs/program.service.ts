import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProgramRequestDto,
  PaginationQueryDto,
  ProgramListResponseDto,
  ProgramResponseDto,
  UpdateProgramRequestDto,
} from '@dad-group-1/backend-common';
import { RpcException } from '@nestjs/microservices';
import { Program } from './entities/program.entity';

@Injectable()
export class ProgramService {
  private readonly logger = new Logger(ProgramService.name);

  constructor(
    @InjectRepository(Program)
    private programRepository: Repository<Program>,
  ) {}

  async create(
    createData: CreateProgramRequestDto,
  ): Promise<ProgramResponseDto> {
    const program = this.programRepository.create({ ...createData });
    try {
      return await this.programRepository.save(program);
    } catch (error) {
      this.logger.error(
        `${error.constructor.name}: Failed to create program record - ${error.message}`,
        error.stack,
      );
      throw new RpcException({
        message: `Failed to create program record`,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  async findAll(query: PaginationQueryDto): Promise<ProgramListResponseDto> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.programRepository.findAndCount({
      relations: {},
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new ProgramListResponseDto(data, total, page, limit);
  }

  async findOne(id: number): Promise<ProgramResponseDto | null> {
    const program = await this.programRepository.findOne({
      where: { id: id },
      relations: { courses: true, programTypes: true },
    });

    if (!program) {
      throw new RpcException({
        message: `Program with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return program;
  }

  async update(
    id: number,
    updateData: UpdateProgramRequestDto,
  ): Promise<ProgramResponseDto | null> {
    const program = await this.programRepository.findOne({
      where: { id: id },
    });
    if (!program) {
      this.logger.error(`Program with ID ${id} not found for update`);
      throw new RpcException({
        message: `Program with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.programRepository.merge(program, updateData);
    return await this.programRepository.save(program);
  }

  async remove(id: number): Promise<ProgramResponseDto | null> {
    const program = await this.programRepository.findOne({
      where: { id: id },
    });
    if (!program) {
      this.logger.error(`Program with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `Program with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.programRepository.remove(program);
    return program;
  }
}
