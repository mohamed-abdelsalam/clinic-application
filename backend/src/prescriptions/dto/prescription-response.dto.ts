import { Prescription } from '@prescriptions/entities/prescription.entity';
import { InstructionResponseDto } from './instruction-response.dto';

export class PrescriptionResponseDto {
  id: string;
  headerNotes: string[];
  instructions: InstructionResponseDto[];
  footerNotes: string[];

  static fromEntity(prescription: Prescription): PrescriptionResponseDto {
    return {
      id: prescription.id,
      headerNotes: prescription.headerNotes,
      instructions: prescription.instructions.map(InstructionResponseDto.fromEntity),
      footerNotes: prescription.footerNotes,
    };
  }
}