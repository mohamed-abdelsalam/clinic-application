import { VisitDto } from '../visit';
import { Gender } from './gender';

export interface PatientDto {
  id: number;
  name: string;
  dateOfBirth?: string;
  email?: string;
  job?: string;
  gender?: Gender;
  phone?: string;
  visits?: VisitDto[];
  registeredAt: Date;
  updatedAt: Date;
}
