import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProgramTypeRequestDto,
  PaginationQueryDto,
  ProgramTypeListResponseDto,
  ProgramTypeResponseDto,
  UpdateProgramTypeRequestDto,
} from '@dad-group-1/backend-common';
import { RpcException } from '@nestjs/microservices';
import { ProgramType } from './entities/program-type.entity';

@Injectable()
export class ProgramTypeService {
  private readonly logger = new Logger(ProgramTypeService.name);

  constructor(
    @InjectRepository(ProgramType)
    private programTypeRepository: Repository<ProgramType>,
  ) {}

  async create(
    createData: CreateProgramTypeRequestDto,
  ): Promise<ProgramTypeResponseDto> {
    const programType = this.programTypeRepository.create({ ...createData });
    try {
      return await this.programTypeRepository.save(programType);
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

  async findAll(
    query: PaginationQueryDto,
  ): Promise<ProgramTypeListResponseDto> {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await this.programTypeRepository.findAndCount({
      relations: {},
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return new ProgramTypeListResponseDto(data, total, page, limit);
  }

  async findOne(id: number): Promise<ProgramTypeResponseDto | null> {
    const programType = await this.programTypeRepository.findOne({
      where: { id: id },
    });

    if (!programType) {
      throw new RpcException({
        message: `ProgramType with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    return programType;
  }

  async update(
    id: number,
    updateData: UpdateProgramTypeRequestDto,
  ): Promise<ProgramTypeResponseDto | null> {
    const programType = await this.programTypeRepository.findOne({
      where: { id: id },
    });
    if (!programType) {
      this.logger.error(`ProgramType with ID ${id} not found for update`);
      throw new RpcException({
        message: `ProgramType with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    this.programTypeRepository.merge(programType, updateData);
    return await this.programTypeRepository.save(programType);
  }

  async remove(id: number): Promise<ProgramTypeResponseDto | null> {
    const programType = await this.programTypeRepository.findOne({
      where: { id: id },
    });
    if (!programType) {
      this.logger.error(`ProgramType with ID ${id} not found for deletion`);
      throw new RpcException({
        message: `ProgramType with ID ${id} not found`,
        code: HttpStatus.NOT_FOUND,
      });
    }

    await this.programTypeRepository.remove(programType);
    return programType;
  }
}
