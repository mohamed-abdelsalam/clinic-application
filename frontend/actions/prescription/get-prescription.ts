import { PrescriptionDto } from '@clinic-application/shared';

export  async function getPrescription(id: number): Promise<PrescriptionDto> {
  try {
    const response = await fetch(`http://localhost:3001/prescriptions/${id}`, {
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