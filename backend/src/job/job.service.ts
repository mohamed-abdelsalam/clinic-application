import PgBoss from 'pg-boss';

import { MedicineDto, PatientDto } from '@clinic-application/shared';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SearchService } from '../search/search.service';

@Injectable()
export class JobService implements OnModuleInit {
  private pgBoss: PgBoss;

  constructor(private configService: ConfigService, private searchService: SearchService) {}
  
  async onModuleInit() {
    this.pgBoss = new PgBoss(this.configService.get<string>('PG_BOSS_CONNECTION_URL'));
    await this.pgBoss.start();
    await this.pgBoss.createQueue('index-medicine');
    await this.pgBoss.createQueue('index-patient');
    await this.pgBoss.createQueue('remove-patient');

    this.pgBoss.work<MedicineDto>('index-medicine', async (job) => {
      await this.searchService.indexMedicine(job[0].data);
    });

    this.pgBoss.work<PatientDto>('index-patient', async (job) => {
      await this.searchService.indexPatient(job[0].data);
    });

    this.pgBoss.work<{patientId: number}>('remove-patient', async (job) => {
      await this.searchService.removePatient(job[0].data.patientId);
    });
  }

  async queueMedicineIndex(medicineDto: MedicineDto) {
    this.pgBoss.send('index-medicine', medicineDto);
  }

  async queuePatientIndex(patientDto: PatientDto) {
    this.pgBoss.send('index-patient', patientDto);
  }

  async queuePatientRemoval(patientId: number) {
    this.pgBoss.send('remove-patient', { patientId });
  }
}
