import { MedicineResponseDto } from '@medicines/dto/medicine-response.dto';
import { Instruction } from '@prescriptions/entities/instruction.entity';

export class InstructionResponseDto {

  id: string;
  medicine: MedicineResponseDto;
  description: string[];

  static fromEntity(instruction: Instruction): InstructionResponseDto {
    return {
      id: instruction.id,
      medicine: MedicineResponseDto.fromEntity(instruction.medicine),
      description: instruction.description,
    };
  }
}