import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { Medicine } from './entities/medicine.entity';
import { MedicineResponseDto } from './dto/medicine-response.dto';

@Injectable()
export class MedicinesService {
  constructor(@InjectRepository(Medicine) private medicineRepo: Repository<Medicine>) {}

  async create(createMedicineDto: CreateMedicineDto): Promise<MedicineResponseDto> {
    const medicine = await this.medicineRepo.save(createMedicineDto);
    return MedicineResponseDto.fromEntity(medicine);
  }

  async findAll(): Promise<MedicineResponseDto[]> {
    const medicines = await this.medicineRepo.find();

    return medicines.map(MedicineResponseDto.fromEntity);
  }

  async findOne(id: string): Promise<Medicine> {
    const medicine = await this.medicineRepo.findOneBy({ id });
    return MedicineResponseDto.fromEntity(medicine);
  }

  async update(id: string, updateMedicineDto: UpdateMedicineDto): Promise<void> {
    this.medicineRepo.update({ id }, updateMedicineDto);
  }

  async remove(id: string): Promise<void> {
    this.medicineRepo.delete(id);
  }
}
