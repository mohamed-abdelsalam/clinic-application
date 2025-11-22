import { PatientDto } from '@clinic-application/shared';

export  async function getPatients(): Promise<PatientDto[]> {
  try {
    const response = await fetch('http://localhost:3001/patients', {
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