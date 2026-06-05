import { Test, TestingModule } from '@nestjs/testing';
import { ProgramTypeService } from './program-type.service';

describe('ProgramTypeService', () => {
  let service: ProgramTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramTypeService],
    }).compile();

    service = module.get<ProgramTypeService>(ProgramTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
