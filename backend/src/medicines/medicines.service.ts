import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { MedicineDto, UpdateMedicineDto } from '@clinic-application/shared';
import { JobService } from '../job/job.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class MedicinesService {
  constructor(private prisma: PrismaService, private jobService: JobService) {}

  async create(data: Prisma.MedicineCreateInput): Promise<MedicineDto> {
    const newMedicine: MedicineDto = await this.prisma.medicine.create({ data });
    await this.jobService.queueMedicineIndex(newMedicine);

    return newMedicine;
  }

  async findOne(id: number): Promise<MedicineDto> {
    return await this.prisma.medicine.findUnique({
      where: { id },
    });
  }

  async update(id: number, data: UpdateMedicineDto): Promise<MedicineDto> {
    return await this.prisma.medicine.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    this.prisma.medicine.delete({
      where: { id },
    });
  }
}
