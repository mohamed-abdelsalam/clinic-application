import { PrescriptionDto, UpdatePrescriptionDto } from '@clinic-application/shared';

export  async function updatePrescription(id: number, updatePrescriptionDto: UpdatePrescriptionDto): Promise<PrescriptionDto> {
  try {
    const response = await fetch(`http://localhost:3001/prescriptions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePrescriptionDto),
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