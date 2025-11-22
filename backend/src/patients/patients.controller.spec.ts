import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { PrismaService } from '../prisma.service';
import { CreatePatientDto } from '@clinic-application/shared';

describe('PatientsController', () => {
  let controller: PatientsController;
  let patientsService: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: PrismaService,
          useValue: {
            patient : {
              create: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            }
          },
        },
        PatientsService
      ],
    }).compile();

    controller = module.get<PatientsController>(PatientsController);
    patientsService = module.get<PatientsService>(PatientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('happy path', async () => {
      const createPatientDto: CreatePatientDto = {
        name: 'Mohamed',
        gender: 'Male',
        phone: '0912345884',
        email: 'email@domain.com',
        dateOfBirth: '1923-09-01',
        job: 'None',
        registeredAt: new Date(2024, 2, 10),
      };
      const responseSpy = jest.spyOn(patientsService, 'create')
        .mockResolvedValue({
          id: 1,
          name: 'patient-1',
          dateOfBirth: '1995-10-20',
          email: 'patient@example.com',
          gender: 'Male',
          job: 'Engineer',
          phone: '012',
          registeredAt: new Date(2024, 2, 10),
          updatedAt: new Date(),
        });
      const patient = await controller.create(createPatientDto);

      expect(responseSpy).toHaveBeenCalledWith(createPatientDto);
      expect(responseSpy).toHaveBeenCalledTimes(1);
      expect(patient).toBeDefined();
      expect(patient.name).toEqual(createPatientDto.name);
    });

    it('should handle error in the service', async () => {
      const createPatientDto: CreatePatientDto = {
        name: 'Mohamed',
        gender: 'Male',
        phone: '0912345884',
        email: 'email@domain.com',
        dateOfBirth: '1923-09-01',
        job: 'None',
        registeredAt: new Date(2024, 2, 10),
      };
      const responseSpy = jest.spyOn(patientsService, 'create').mockImplementation(() => {
        throw new Error('error');
      });
      try {
        await controller.create(createPatientDto);
        fail('should throw exception');
      } catch (error) {
        expect(responseSpy).toHaveBeenCalledWith(createPatientDto);
        expect(responseSpy).toHaveBeenCalledTimes(1);
        expect(error.message).toEqual('Failed to create new patient with error: Error: error');
      }
    });
  });
});
