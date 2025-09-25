import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';
import { PatientResponseDto } from './dto/patient-response.dto';

@Injectable()
export class PatientsService {
  constructor(@InjectRepository(Patient) private patientsRepo: Repository<Patient>) {}

  async create(createPatientDto: CreatePatientDto): Promise<PatientResponseDto> {
    const patient = await this.patientsRepo.save({ 
      ...createPatientDto,
      visits: [],
    });

    return PatientResponseDto.fromEntity(patient);
  }

  async findAll(): Promise<PatientResponseDto[]> {
    const patients = await this.patientsRepo.find({ 
      relations: { 
        visits: { 
          prescriptions: { 
            instructions: true
          }
        }
      }
    });
    
    return patients.map(PatientResponseDto.fromEntity);
  }

  async findOne(id: string): Promise<PatientResponseDto> {
    const patient =  await this.patientsRepo.findOne({
      where: { id },
      relations: {
        visits: {
          prescriptions: {
            instructions: true
          }
        }
      },
    });

    return PatientResponseDto.fromEntity(patient);
  }

  async update(id: string, updatePatientDto: UpdatePatientDto): Promise<void> {
    this.patientsRepo.update(id, updatePatientDto);
  }

  async remove(id: string): Promise<void> {
    this.patientsRepo.delete({ id });
  }
}
