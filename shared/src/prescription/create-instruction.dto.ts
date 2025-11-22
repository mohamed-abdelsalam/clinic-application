export interface CreateInstructionDto {
  prescriptionId: number;
  medicineId: number;
  description: string;
  strengthValue: string;
  group? : number;
}
