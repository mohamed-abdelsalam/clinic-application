import { MedicineSearchDto } from '@clinic-application/shared';

export async function searchMedicine(query: string): Promise<MedicineSearchDto[]> {
  try {
    const response = await fetch(`http://localhost:3001/search/medicine?query=${query}`, {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      return response.json();
    }
  } catch (error) {
    console.error(error);
  }
}