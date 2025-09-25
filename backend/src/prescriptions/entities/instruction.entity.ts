import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Medicine } from '@medicines/entities/medicine.entity';
import { Prescription } from './prescription.entity';

@Entity()
export class Instruction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Medicine, { eager: true })
  medicine: Medicine;

  @ManyToOne(() => Prescription, (prescription) => prescription.instructions, { onDelete: 'CASCADE' })
  prescription: Prescription;

  @Column({ type: 'text', array: true })
  description: string[]; 
}