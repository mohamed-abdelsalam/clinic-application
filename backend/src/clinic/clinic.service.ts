import { Injectable } from '@nestjs/common';

import { Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ClinicService {
  constructor(private prismaService: PrismaService) {}

  create(data: Prisma.ClinicCreateInput) {
    const newClinic = this.prismaService.clinic.create({ data });

    return newClinic;
  }

  findAll() {
    return this.prismaService.clinic.findMany({});
  }

  findOne(id: number) {
    return this.prismaService.clinic.findUnique({
      where: { id },
    });
  }

  update(id: number, data: Prisma.ClinicUpdateInput) {
    return this.prismaService.clinic.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    this.prismaService.clinic.delete({
      where: { id },
    });
  }
}
