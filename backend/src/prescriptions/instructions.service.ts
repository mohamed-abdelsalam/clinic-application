import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateInstructionDto,
  InstructionDto,
  UpdateInstructionDto
} from '@clinic-application/shared';

@Injectable()
export class InstructionsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateInstructionDto): Promise<InstructionDto> {
    const { prescriptionId, ...rest } = data;

    return await this.prismaService.instruction.create({
      data: {
        ...rest,
        prescription: { connect: { id: prescriptionId }},
      }
    });
  }

  async findAllByPrescription(prescriptionId: number): Promise<InstructionDto[]> {
    return await this.prismaService.instruction.findMany({
      where: {
        prescriptionId,
      }
    });
  }

  async findOne(id: number): Promise<InstructionDto> {
    return await this.prismaService.instruction.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateInstructionDto: UpdateInstructionDto): Promise<InstructionDto> {
    return await this.prismaService.instruction.update({
      where: { id },
      data: updateInstructionDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.instruction.delete({ where: { id } });
  }
}
