import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Visit } from '@visits/entities/visit.entity';

import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Prescription } from './entities/prescription.entity';
import { PrescriptionResponseDto } from './dto/prescription-response.dto';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectRepository(Prescription) private readonly prescriptionsRepo: Repository<Prescription>,
    @InjectRepository(Visit) private readonly visitsRepo: Repository<Visit>,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto): Promise<PrescriptionResponseDto> {
    const prescription = await this.prescriptionsRepo.save({
      headerNotes: createPrescriptionDto.headerNotes,
      footerNotes: createPrescriptionDto.footerNotes,
      visit: await this.visitsRepo.findOneBy({ id: createPrescriptionDto.visitId }),
      instructions: [],
    });

    return PrescriptionResponseDto.fromEntity(prescription);
  }

  async findAll(): Promise<PrescriptionResponseDto[]> {
    const prescriptions = await this.prescriptionsRepo.find();

    return prescriptions.map(PrescriptionResponseDto.fromEntity);
  }

  async findOne(id: string): Promise<PrescriptionResponseDto> {
    const prescription = await this.prescriptionsRepo.findOneBy({ id });
    return PrescriptionResponseDto.fromEntity(prescription);
  }

  async update(id: string, updatePrescriptionDto: UpdatePrescriptionDto): Promise<void> {
    await this.prescriptionsRepo.update({ id }, updatePrescriptionDto);
  }

  async remove(id: string): Promise<void> {
    await this.prescriptionsRepo.delete({ id });
  }
}
