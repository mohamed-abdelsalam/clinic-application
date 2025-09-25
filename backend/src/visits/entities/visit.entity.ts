import { 
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

import { Patient } from '@patients/entities/patient.entity';
import { Prescription } from '@prescriptions/entities/prescription.entity';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.visits, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @OneToMany(() => Prescription, (prescription) => prescription.visit, { cascade: true })
  prescriptions: Prescription[];

  @Column()
  branch: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
