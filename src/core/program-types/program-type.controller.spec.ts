import { Test, TestingModule } from '@nestjs/testing';
import { ProgramTypeController } from './program-type.controller';

describe('ProgramTypeController', () => {
  let controller: ProgramTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramTypeController],
    }).compile();

    controller = module.get<ProgramTypeController>(ProgramTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
