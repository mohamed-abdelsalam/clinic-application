import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Visit } from 'generated/prisma';
import { CreateVisitDto, VisitDto } from '@clinic-application/shared';

@Injectable()
export class VisitsService {
  constructor(private prismaService: PrismaService) {}

  async create(createVisitDto: CreateVisitDto): Promise<VisitDto> {
    const { patientId, ...rest} = createVisitDto;
    return await this.prismaService.visit.create({
      data: {
        ...rest,
        patient: { connect: { id: createVisitDto.patientId } },
      },
      include: {
        patient: true,
        prescriptions: { include: {instructions: true } },
      }
    });
  }

  async findAllByPatient(patientId: number): Promise<VisitDto[]> {
    return await this.prismaService.visit.findMany({
      where: {
        patientId
      },
      include: { patient : true,
        prescriptions: { include: { instructions: true } }
      }
    });
  }

  async findLastByPatient(patientId: number): Promise<VisitDto> {
    return await this.prismaService.visit.findMany({
      where: {
        patientId
      },
      orderBy: { createdAt: 'desc' },
      include: { patient : true }
    })[0];
  }

  async findOne(id: number): Promise<Visit> {
    return await this.prismaService.visit.findUnique({
      where: { id },
      include: {
        patient: true,
        prescriptions: {
          include: {
            instructions: true,
          }
        }
      }
    });
  }

  async update(id: number, data: Prisma.VisitUpdateInput): Promise<VisitDto> {
    return await this.prismaService.visit.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.visit.delete({
      where: { id },
    });
  }
}
