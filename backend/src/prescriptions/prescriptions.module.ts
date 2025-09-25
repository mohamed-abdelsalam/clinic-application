import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrescriptionsService } from './prescriptions.service';
import { PrescriptionsController } from './prescriptions.controller';
import { Prescription } from './entities/prescription.entity';
import { InstructionsController } from './instructions.controller';
import { InstructionsService } from './instructions.service';
import { Instruction } from './entities/instruction.entity';
import { VisitsModule } from '@visits/visits.module';
import { MedicinesModule } from '@medicines/medicines.module';

@Module({
  imports: [
    VisitsModule,
    MedicinesModule,
    TypeOrmModule.forFeature([Instruction, Prescription])
  ],
  controllers: [PrescriptionsController, InstructionsController],
  providers: [PrescriptionsService, InstructionsService],
  exports: [TypeOrmModule],
})
export class PrescriptionsModule {}
