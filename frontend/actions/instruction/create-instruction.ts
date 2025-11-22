import { CreateInstructionDto, InstructionDto } from '@clinic-application/shared';

export async function createInstruction(createInstructionDto: CreateInstructionDto): Promise<InstructionDto> {
  try {
    const response = await fetch('http://localhost:3001/instructions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createInstructionDto),
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