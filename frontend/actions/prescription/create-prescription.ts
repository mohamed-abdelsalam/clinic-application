import { CreatePrescriptionDto, PrescriptionDto } from '@clinic-application/shared';

export  async function createPrescription(createPrescriptionDto: CreatePrescriptionDto): Promise<PrescriptionDto> {
  try {
    const response = await fetch(`http://localhost:3001/prescriptions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createPrescriptionDto),
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