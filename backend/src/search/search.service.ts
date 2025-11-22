import { MeiliSearch } from 'meilisearch';
import { Inject, Injectable } from '@nestjs/common';
import { MedicineDto, MedicineSearchDto, PatientDto, PatientSearchDto } from '@clinic-application/shared';

@Injectable()
export class SearchService {
  constructor(@Inject('MeiliClient') private client: MeiliSearch) {}

  async indexMedicine(medicine: MedicineDto) {
    const index = this.client.index<MedicineSearchDto>('medicine');
    await index.addDocuments([{
      name: medicine.name,
      id: medicine.id,
      activeSubstances: medicine.activeSubstances,
      indications: medicine.indications,
      updatedAt: medicine.updatedAt,
    }], { primaryKey: 'id' });
  }

  async searchMedicine(query: string, filters: string[], sort: string[]): Promise<MedicineSearchDto[]> {
    const index = this.client.index<MedicineSearchDto>('medicine');
    const searchResponse = await index.search(query, {
      filter: filters,
      sort,
    });

    return searchResponse.hits;
  }

  async indexPatient(patient: PatientDto) {
    const index = this.client.index<PatientSearchDto>('patient');
    await index.addDocuments([{
      name: patient.name,
      id: patient.id,
      phone: patient.phone,
      email: patient.email,
      updatedAt: patient.updatedAt,
    }], { primaryKey: 'id' });
  }

  async searchPatient(query: string, filters: string[], sort: string[]): Promise<PatientSearchDto[]> {
    const index = this.client.index<PatientSearchDto>('patient');
    const searchResponse = await index.search(query, {
      filter: filters,
      sort,
    });

    return searchResponse.hits;
  }

  async removePatient(patientId: number) {
    const index = this.client.index<PatientSearchDto>('patient');
    await index.deleteDocument(patientId);
  }
}
