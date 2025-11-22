import { MedicineSearchDto } from './medicine-search.dto';
import { PatientSearchDto } from './patient-search.dto';

export interface SearchDto {
  medicines: MedicineSearchDto[];
  patients: PatientSearchDto[];
}