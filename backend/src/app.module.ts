import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { PatientsModule } from './patients/patients.module';
import { MedicinesModule } from './medicines/medicines.module';
import { VisitsModule } from './visits/visits.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma.module';
import { SearchModule } from './search/search.module';
import { JobService } from './job/job.service';
import { JobModule } from './job/job.module';
import { UserModule } from './user/user.module';
import { ClinicModule } from './clinic/clinic.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    PrescriptionsModule,
    PatientsModule,
    MedicinesModule,
    VisitsModule,
    SearchModule,
    JobModule,
    UserModule,
    ClinicModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JobService, AuthService],
})
export class AppModule {}
