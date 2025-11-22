import { InstructionDto } from '@clinic-application/shared';

export async function getPrescriptionInstructions(prescriptionId: number): Promise<InstructionDto[]> {
  try {
    const response = await fetch(`http://localhost:3001/instructions/prescription/${prescriptionId}`, {
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