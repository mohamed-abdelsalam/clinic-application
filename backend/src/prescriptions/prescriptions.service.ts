import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from 'generated/prisma';
import { CreatePrescriptionDto, PrescriptionDto, UpdatePrescriptionDto } from '@clinic-application/shared';
import { VisitsService } from '@visits/visits.service';
import { InstructionsService } from './instructions.service';

@Injectable()
export class PrescriptionsService {
  constructor(
    private prismaService: PrismaService,
    private visitsService: VisitsService,
    private instructionsService: InstructionsService,
  ) {}

  async create(data: CreatePrescriptionDto): Promise<PrescriptionDto> {
    const { visitId, ...rest } = data;

    return await this.prismaService.prescription.create({
      data: {
        ...rest,
        visit: {
          connect: {
            id: visitId,
          }
        },
      },
      include: { instructions: true },
    });
  }

  async findAllByVisit(visitId: number): Promise<PrescriptionDto[]> {
    return await this.prismaService.prescription.findMany({
      where: {
        visitId
      },
      include: {
        instructions : true,
      }
    });
  }

  async copyToPatient(prescriptionId: number, patientId: number): Promise<PrescriptionDto> {
    const visit = await this.visitsService.findLastByPatient(patientId);
    const prescription = await this.findOne(prescriptionId);

    const newPrescription = await this.create({
      headerNotes: prescription.headerNotes,
      visitId: visit.id,
      footerNotes: prescription.footerNotes,
    });
    await Promise.all(prescription.instructions.map(async (instruction) => {
      return await this.instructionsService.create({
        description: instruction.description,
        medicineId: instruction.medicineId,
        prescriptionId: newPrescription.id,
        strengthValue: instruction.strengthValue,
        group: instruction.group,
      });
    }));

    return newPrescription;
  }

  async findOne(id: number): Promise<PrescriptionDto> {
    return await this.prismaService.prescription.findUnique({
      where: { id },
      include: { instructions: true, },
    });
  }

  async update(id: number, data: UpdatePrescriptionDto): Promise<PrescriptionDto> {
    return await this.prismaService.prescription.update({
      where: { id },
      data,
      include: { instructions: true },
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.prescription.delete({
      where: { id },
    });
  }
}
