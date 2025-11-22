export interface MedicineDto {
  id: number;
  name: string;
  activeSubstances: string[];
  strengthUnit: string;
  strengthValues: string[];
  dosageInstructions: string[];
  maxDailyDose: number;
  sideEffects: string[];
  indications: string[];
  createdAt: Date;
  updatedAt: Date;
}