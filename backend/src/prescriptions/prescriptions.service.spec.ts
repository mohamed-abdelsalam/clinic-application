import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Visit } from '@visits/entities/visit.entity';

import { PrescriptionsService } from './prescriptions.service';
import { Prescription } from './entities/prescription.entity';

describe('PrescriptionsService', () => {
  let service: PrescriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Prescription),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(Visit),
          useValue: {
            findOneBy: jest.fn(),
          }
        },
        PrescriptionsService
      ],
    }).compile();

    service = module.get<PrescriptionsService>(PrescriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
