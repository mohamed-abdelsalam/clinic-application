import { MedicineDto, UpdateMedicineDto } from '@clinic-application/shared';

export async function updateMedicine(id: number, updateMedicineDto: UpdateMedicineDto): Promise<MedicineDto> {
  try {
    const response = await fetch(`http://localhost:3001/medicines/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateMedicineDto),
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