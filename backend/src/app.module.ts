import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { PatientsModule } from './patients/patients.module';
import { MedicinesModule } from './medicines/medicines.module';
import { VisitsModule } from './visits/visits.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Patient } from '@patients/entities/patient.entity';
import { Medicine } from '@medicines/entities/medicine.entity';
import { Visit } from '@visits/entities/visit.entity';
import { Instruction } from '@prescriptions/entities/instruction.entity';
import { Prescription } from '@prescriptions/entities/prescription.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrescriptionsModule,
    PatientsModule,
    MedicinesModule,
    VisitsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [Patient, Medicine, Visit, Instruction, Prescription],
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        username: configService.get<string>('DB_USER'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
