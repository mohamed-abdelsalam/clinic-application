import { InstructionDto, UpdateInstructionDto } from '@clinic-application/shared';

export async function updateInstruction(id: number, updateInstructionDto: UpdateInstructionDto): Promise<InstructionDto> {
  try {
    const response = await fetch(`http://localhost:3001/instructions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateInstructionDto),
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