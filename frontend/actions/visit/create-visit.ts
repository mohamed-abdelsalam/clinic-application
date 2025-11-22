import { CreateVisitDto, VisitDto } from '@clinic-application/shared';

export  async function createVisit(createVisitDto: CreateVisitDto): Promise<VisitDto> {
  try {
    const response = await fetch('http://localhost:3001/visits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createVisitDto),
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