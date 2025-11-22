export interface MedicineSearchDto {
  id: number;
  name: string;
  activeSubstances: string[];
  indications: string[];
  updatedAt: Date;
}
