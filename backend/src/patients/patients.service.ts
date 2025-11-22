import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePatientDto, PatientDto, UpdatePatientDto } from '@clinic-application/shared';
import { JobService } from '../job/job.service';
import { Prisma } from '../../generated/prisma';

@Injectable()
export class PatientsService {
  constructor(private prismaService: PrismaService, private jobService: JobService) {}

  async create(data: CreatePatientDto): Promise<PatientDto> {
    const patientDto = await this.prismaService.patient.create({ data });
    this.jobService.queuePatientIndex(patientDto);
    return patientDto;
  }

  async find(): Promise<PatientDto[]> {
    const patients = await this.prismaService.patient.findMany({
      orderBy: { updatedAt: Prisma.SortOrder.desc},
      take: 20,
    });

    return patients;
  }

  async findOne(id: number): Promise<PatientDto> {
    return await this.prismaService.patient.findUnique({
      where: { id },
      include: {
        visits: true,
      }
    });
  }

  async update(id: number, data: UpdatePatientDto): Promise<PatientDto> {
    return await this.prismaService.patient.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.patient.delete({
      where: { id },
    });
  }
}
