import { UpdateVisitDto } from '@clinic-application/shared';

export  async function updateVisit(id: number, updateVisitDto: UpdateVisitDto): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3001/visits/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateVisitDto),
      credentials: 'include',
    });
    if (response.ok) {
      return;
    }
  } catch (error) {
    console.error(error);

    return ;
  }
}