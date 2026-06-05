import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateProgramRequestDto,
  PaginationQueryDto,
  UpdateProgramRequestDto,
} from '@dad-group-1/backend-common';
import { ProgramService } from './program.service';

@Controller('programs')
export class ProgramController {
  private readonly logger = new Logger(ProgramController.name);
  constructor(private readonly programService: ProgramService) {}

  @MessagePattern({ cmd: 'create_program' })
  async create(@Payload() data: CreateProgramRequestDto) {
    return this.programService.create(data);
  }

  @MessagePattern({ cmd: 'find_all_programs' })
  findAll(query: PaginationQueryDto) {
    return this.programService.findAll(query);
  }

  @MessagePattern({ cmd: 'find_one_program' })
  findOne(@Payload() id: number) {
    return this.programService.findOne(id);
  }

  @MessagePattern({ cmd: 'update_program' })
  update(
    @Payload()
    payload: {
      id: number;
      updateData: UpdateProgramRequestDto;
    },
  ) {
    return this.programService.update(payload.id, payload.updateData);
  }

  @MessagePattern({ cmd: 'remove_program' })
  remove(@Payload() id: number) {
    return this.programService.remove(id);
  }
}
