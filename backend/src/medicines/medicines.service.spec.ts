import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { MedicinesService } from './medicines.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Medicine } from './entities/medicine.entity';

describe('MedicinesService', () => {
  let service: MedicinesService;
  let medicineRepo: Repository<Medicine>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Medicine),
          useValue: {},
        },
        MedicinesService,
      ],
    }).compile();

    service = module.get<MedicinesService>(MedicinesService);
    medicineRepo = module.get<Repository<Medicine>>(getRepositoryToken(Medicine));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
