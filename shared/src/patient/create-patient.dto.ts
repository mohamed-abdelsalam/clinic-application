import { Gender } from './gender';

export interface CreatePatientDto {
  name: string;
  gender?: Gender;
  phone?: string;
  job?: string;
  dateOfBirth?: string;
  email?: string;
}