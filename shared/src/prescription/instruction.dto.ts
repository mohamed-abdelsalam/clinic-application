export interface InstructionDto {
  id: number;
  prescriptionId: number;
  medicineId: number;
  description: string;
  strengthValue: string;
  group? : number;
}