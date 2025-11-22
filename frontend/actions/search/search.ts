import { SearchQuery } from '@clinic-application/shared';
import { searchMedicine } from './search-medicine';
import { searchPatient } from './search-patient';

export async function search(searchQuery: SearchQuery) {
  const medicines = await searchMedicine(searchQuery.query);
  const patients = await searchPatient(searchQuery.query);

  return {
    medicines,
    patients
  };
}