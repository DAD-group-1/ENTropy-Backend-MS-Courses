import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateProgramTypeRequestDto,
  PaginationQueryDto,
  UpdateProgramTypeRequestDto,
} from '@dad-group-1/backend-common';
import { ProgramTypeService } from './program-type.service';

@Controller('program-types')
export class ProgramTypeController {
  private readonly logger = new Logger(ProgramTypeController.name);
  constructor(private readonly programTypeService: ProgramTypeService) {}

  @MessagePattern({ cmd: 'create_program_type' })
  async create(@Payload() data: CreateProgramTypeRequestDto) {
    return this.programTypeService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_program_types' })
  findAll(query: PaginationQueryDto) {
    return this.programTypeService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_program_type' })
  findOne(@Payload() id: number) {
    return this.programTypeService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_program_type' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateProgramTypeRequestDto;
    },
  ) {
    return this.programTypeService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_program_type' })
  remove(@Payload() id: number) {
    return this.programTypeService.remove(id);
  }
}
