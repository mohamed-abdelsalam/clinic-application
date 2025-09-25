import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { Visit } from './entities/visit.entity';
import { PatientsModule } from '@patients/patients.module';

@Module({
  imports: [
    PatientsModule,
    TypeOrmModule.forFeature([Visit]),
  ],
  controllers: [VisitsController],
  providers: [VisitsService],
  exports: [TypeOrmModule],
})
export class VisitsModule {}
