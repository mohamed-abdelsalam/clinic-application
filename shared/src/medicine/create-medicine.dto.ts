export interface CreateMedicineDto {
  name: string;
  activeSubstances: string[];
  strengthUnit: string;
  strengthValues: string[];
  dosageInstructions: string[];
  maxDailyDose: number;
  sideEffects: string[];
  indications: string[];
}
