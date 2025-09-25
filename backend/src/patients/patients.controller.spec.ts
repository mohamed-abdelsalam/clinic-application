import { Test, TestingModule } from '@nestjs/testing';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';

describe('PatientsController', () => {
  let controller: PatientsController;
  let patientsService: PatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatientsController],
      providers: [
        {
          provide: getRepositoryToken(Patient),
          useValue: {
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOneBy: jest.fn(),
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
      };
      const responseSpy = jest.spyOn(patientsService, 'create')
        .mockReturnValue(Promise.resolve({
          id: '3',
          registeredAt: new Date("1996-12-17T03:24:00"),
          ...createPatientDto
        }
      ));
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
