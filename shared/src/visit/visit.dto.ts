import { PrescriptionDto } from '../prescription';
import { VisitType } from './visit-type';

export interface VisitDto {
  id: number;
  patientId: number;
  date: string;
  createdAt: Date;
  branch: string;
  type: VisitType;
  prescriptions?: PrescriptionDto[];
  updatedAt: Date;
}
