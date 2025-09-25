import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Visit } from '@visits/entities/visit.entity';
import { Instruction } from './instruction.entity';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Visit, (visit) => visit.prescriptions , { onDelete: 'CASCADE' })
  visit: Visit;

  @Column({ type: 'text', array: true })
  headerNotes: string[];

  @OneToMany(() => Instruction, (instruction) => instruction.prescription , { eager: true, cascade: true })
  instructions: Instruction[];

  @Column({ type: 'text', array: true })
  footerNotes: string[];
}
