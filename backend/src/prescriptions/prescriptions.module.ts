import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { InstructionsController } from './instructions.controller';
import { InstructionsService } from './instructions.service';
import { VisitsModule } from '@visits/visits.module';
import { PatientsModule } from '@patients/patients.module';

@Module({
  imports: [
    VisitsModule,
    PatientsModule,
  ],
  controllers: [PrescriptionsController, InstructionsController],
  providers: [PrescriptionsService, InstructionsService],
})
export class PrescriptionsModule {}
