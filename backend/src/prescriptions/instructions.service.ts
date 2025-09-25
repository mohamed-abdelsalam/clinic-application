import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Instruction } from './entities/instruction.entity';
import { CreateInstructionDto } from './dto/create-instruction.dto';
import { Prescription } from './entities/prescription.entity';
import { InstructionResponseDto } from './dto/instruction-response.dto';
import { UpdateInstructionDto } from './dto/update-instruction.dto';
import { PrescriptionNotFoundException } from './exceptions/prescription-not-found-exception';
import { Medicine } from '@medicines/entities/medicine.entity';

@Injectable()
export class InstructionsService {
  constructor(
    @InjectRepository(Instruction) private readonly instructionsRepo: Repository<Instruction>,
    @InjectRepository(Prescription) private readonly prescriptionsRepo: Repository<Prescription>,
    @InjectRepository(Medicine) private readonly medicinesRepo: Repository<Medicine>,
  ) {}

  async create(prescriptionId: string, createInstructionDto: CreateInstructionDto): Promise<InstructionResponseDto> {
    const [prescription, medicine] = await Promise.all([
      await this.prescriptionsRepo.findOneBy({ id: prescriptionId }),
      await this.medicinesRepo.findOneBy({ id: createInstructionDto.medicineId }),
    ]);

    if (!prescription)
      throw new PrescriptionNotFoundException(`Failed to create instruction for non-exist prescription ${prescriptionId}`);

    const instruction = await this.instructionsRepo.save({
      medicine,
      prescription,
      description: createInstructionDto.description,
    });
    return InstructionResponseDto.fromEntity(instruction);
  }

  async findAllByPrescription(prescriptionId: string): Promise<InstructionResponseDto[]> {
    const instructions = await this.instructionsRepo.find({
      where: {
        prescription: { id: prescriptionId },
      },
      relations: ['medicine'],
    });

    return instructions.map(InstructionResponseDto.fromEntity);
  }

  async findOne(id: string): Promise<InstructionResponseDto> {
    const instruction = await this.instructionsRepo.findOne({
      where: {
        id,
      },
      relations: ['medicine', 'prescription'],
    });
    return InstructionResponseDto.fromEntity(instruction);
  }

  async update(id: string, updateInstructionDto: UpdateInstructionDto): Promise<void> {
    await this.instructionsRepo.update({ id }, updateInstructionDto);
  }

  async remove(id: string): Promise<void> {
    await this.instructionsRepo.delete({ id });
  }
}
