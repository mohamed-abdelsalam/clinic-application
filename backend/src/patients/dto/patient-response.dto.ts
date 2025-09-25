import { Patient } from '@patients/entities/patient.entity';
import { VisitResponseDto } from '@visits/dto/visit-response.dto';

export class PatientResponseDto {
  id: string;
  name: string;
  gender: string;
  phone: string;
  job: string;
  dateOfBirth: string;
  registeredAt: Date;
  email?: string;
  visits: VisitResponseDto[];

  static fromEntity(patient: Patient): PatientResponseDto {
    return {
      id: patient.id,
      name: patient.name,
      gender: patient.gender,
      phone: patient.phone,
      job: patient.job,
      dateOfBirth: patient.dateOfBirth,
      registeredAt: patient.registeredAt,
      email: patient.email,
      visits: patient.visits.map(VisitResponseDto.fromEntity),
    };
  }
}
