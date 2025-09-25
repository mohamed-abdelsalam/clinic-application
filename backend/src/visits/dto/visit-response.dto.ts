import { PrescriptionResponseDto } from '@prescriptions/dto/prescription-response.dto';
import { Visit } from '@visits/entities/visit.entity';

export class VisitResponseDto {
  id: string;
  patientId: string;
  date: Date;
  branch: string;
  prescriptions: PrescriptionResponseDto[];

  static fromEntity(visit: Visit): VisitResponseDto {
    return {
      id: visit.id,
      patientId: visit.patient.id,
      date: visit.date,
      branch: visit.branch,
      prescriptions: visit.prescriptions.map(PrescriptionResponseDto.fromEntity),
    };
  }
}