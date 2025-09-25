import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Patient } from '@patients/entities/patient.entity';

import { CreateVisitDto } from './dto/create-visit.dto';
import { UpdateVisitDto } from './dto/update-visit.dto';
import { Visit } from './entities/visit.entity';
import { VisitResponseDto } from './dto/visit-response.dto';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(Patient) private readonly patientsRepo: Repository<Patient>,
    @InjectRepository(Visit) private readonly visitsRepo: Repository<Visit>,
  ) {}

  async create(createVisitDto: CreateVisitDto): Promise<VisitResponseDto> {
    const patient = await this.patientsRepo.findOneBy({ id: createVisitDto.patientId });

    const visit = await this.visitsRepo.save({ 
      branch: createVisitDto.branch,
      patient,
      prescriptions: [],
    });

    return VisitResponseDto.fromEntity(visit);
  }

  async findAllByPatient(patientId: string): Promise<VisitResponseDto[]> {
    const visits = await this.visitsRepo.find({
      where: {
        patient: { id: patientId },
      },
    });

    return visits.map(VisitResponseDto.fromEntity);
  }

  async findOne(id: string): Promise<VisitResponseDto> {
    const visit = await this.visitsRepo.findOne({
      where: { id },
    });

    return VisitResponseDto.fromEntity(visit);
  }

  async update(id: string, updateVisitDto: UpdateVisitDto): Promise<void> {
    this.visitsRepo.update({ id }, updateVisitDto);
  }

  async remove(id: string): Promise<void> {
    this.visitsRepo.delete({ id });
  }
}
