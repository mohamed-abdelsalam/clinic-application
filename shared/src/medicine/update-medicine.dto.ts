import { CreateMedicineDto } from './create-medicine.dto';

export interface UpdateMedicineDto extends Partial<CreateMedicineDto> {}