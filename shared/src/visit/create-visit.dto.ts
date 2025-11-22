import { VisitType } from './visit-type';

export interface CreateVisitDto {
  patientId: number;
  date: string;
  branch: string;
  type: VisitType;
}