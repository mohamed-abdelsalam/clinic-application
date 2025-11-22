import { CreatePatientDto, PatientDto } from '@clinic-application/shared';

export async function createPatient(createPatientDto: CreatePatientDto): Promise<PatientDto> {
  try {
    const response = await fetch('http://localhost:3001/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createPatientDto),
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