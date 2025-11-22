import { CreatePatientDto } from './create-patient.dto';

export interface UpdatePatientDto extends Partial<CreatePatientDto> {}