import { VisitDto } from '@clinic-application/shared';

export  async function getVisit(id: number): Promise<VisitDto> {
  try {
    const response = await fetch(`http://localhost:3001/visits/${id}`, {
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