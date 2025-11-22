import { CreateMedicineDto, MedicineDto } from '@clinic-application/shared';

export async function createMedicine(createMedicineDto: CreateMedicineDto): Promise<MedicineDto> {
  try {
    const response = await fetch('http://localhost:3001/medicines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createMedicineDto),
      credentials: 'include',
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);

    return null;
  }
}