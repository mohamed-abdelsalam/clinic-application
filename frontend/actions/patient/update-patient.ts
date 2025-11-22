import { PatientDto, UpdatePatientDto } from '@clinic-application/shared';

export  async function updatePatient(id: number, updatePatientDto: UpdatePatientDto): Promise<PatientDto> {
  try {
    const response = await fetch(`http://localhost:3001/patients/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatePatientDto),
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