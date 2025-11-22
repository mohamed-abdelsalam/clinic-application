export async function deletePatient(id: number): Promise<void> {
  try {
    const response = await fetch(`http://localhost:3001/patients/${id}`, {
      method: 'DELETE',
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