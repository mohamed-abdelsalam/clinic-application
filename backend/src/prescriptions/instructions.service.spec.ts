import { Repository } from 'typeorm';

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { InstructionsService } from './instructions.service';
import { Medicine } from '@medicines/entities/medicine.entity';
import { Prescription } from './entities/prescription.entity';
import { Instruction } from './entities/instruction.entity';

describe('InstructionsService', () => {
  let service: InstructionsService;
  let prescriptionsRepo: Repository<Prescription>;
  let medicinesRepo: Repository<Medicine>;
  let instructionsRepo: Repository<Instruction>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Medicine),
          useValue: {
            findOneBy: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(Prescription),
          useValue: {
            findOneBy: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(Instruction),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }
        },
        InstructionsService
      ],
    }).compile();

    service = module.get<InstructionsService>(InstructionsService);
    medicinesRepo = module.get<Repository<Medicine>>(getRepositoryToken(Medicine));
    prescriptionsRepo = module.get<Repository<Prescription>>(getRepositoryToken(Prescription));
    instructionsRepo = module.get<Repository<Instruction>>(getRepositoryToken(Instruction));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create instruction successfully', async () => {
      const createInstructionDto = {
        medicineId: 'medicine_id',
        description: ['one time', 'two times'],
      };

      const mockedMedicine = {
        id: 'medicine_id',
        name: 'medicine_name',
        genericName: 'genericName',
        activeSubstances: [],
        strengthUnit: 'mg',
        strengthValues: [],
        dosageInstructions: [],
        maxDailyDose: 3,
        sideEffects: [],
        indications: [],
      };

      const mockedPrescription = {
        id: 'prescription_id',
        headerNotes: [],
        footerNotes: [],
        instructions: [],
        visit: null,
      }

      const prescriptionsRepoSpy = jest.spyOn(prescriptionsRepo, 'findOneBy')
        .mockReturnValue(Promise.resolve(mockedPrescription));
      const medicinesRepoSpy = jest.spyOn(medicinesRepo, 'findOneBy')
        .mockReturnValue(Promise.resolve(mockedMedicine));

      const instructionsRepoSpy = jest.spyOn(instructionsRepo, 'save')
        .mockReturnValue(Promise.resolve({
          id: 'instruction_id',
          medicine: mockedMedicine,
          prescription: mockedPrescription,
          description: ['one time', 'two times'],
        })
      );

      const instructionResponseDto = await service.create('prescription_id', createInstructionDto);

      expect(instructionResponseDto).toBeDefined();
      expect(instructionResponseDto.id).toEqual('instruction_id');
      expect(instructionResponseDto.medicine.id).toEqual(mockedMedicine.id);
      expect(instructionResponseDto.description).toEqual(createInstructionDto.description);

      expect(medicinesRepoSpy).toHaveBeenCalledTimes(1);
      expect(prescriptionsRepoSpy).toHaveBeenCalledTimes(1);
      expect(instructionsRepoSpy).toHaveBeenCalledTimes(1);
      
      expect(instructionsRepoSpy).toHaveBeenCalledWith({
        medicine: mockedMedicine,
        prescription: mockedPrescription,
        description: createInstructionDto.description,
      });

      expect(prescriptionsRepoSpy).toHaveBeenCalledWith({ id: 'prescription_id' });

      expect(medicinesRepoSpy).toHaveBeenCalledWith({ id: 'medicine_id' });
      
    });
  })
});
