import { MedicineDto } from '@clinic-application/shared';

export async function getMedicine(id: number): Promise<MedicineDto> {
  try {
    const response = await fetch(`http://localhost:3001/medicines/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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