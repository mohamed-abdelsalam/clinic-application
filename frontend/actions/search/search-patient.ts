import { PatientSearchDto } from '@clinic-application/shared';

export async function searchPatient(query: string): Promise<PatientSearchDto[]> {
  try {
    const response = await fetch(`http://localhost:3001/search/patient?query=${query}`, {
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