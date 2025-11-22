import { InstructionDto } from './instruction.dto';

export interface PrescriptionDto {
  id: number;
  visitId: number;
  headerNotes: string[];
  instructions?: InstructionDto[];
  footerNotes: string[];
  createdAt: Date;
  updatedAt: Date;
}