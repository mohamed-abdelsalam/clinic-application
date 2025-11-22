import { PatientDto } from '@clinic-application/shared';

export  async function getPatient(id: number): Promise<PatientDto> {
  try {
    const response = await fetch(`http://localhost:3001/patients/${id}`, {
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