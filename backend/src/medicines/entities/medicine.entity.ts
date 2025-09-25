import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  genericName: string;

  @Column({ type: 'text', array: true })
  activeSubstances: string[];

  @Column()
  strengthUnit: string;

  @Column({ type: 'text', array: true })
  strengthValues: string[];

  @Column({ type: 'text', array: true })
  dosageInstructions: string[];

  @Column({ type: 'decimal' })
  maxDailyDose: number;

  @Column({ type: 'text', array: true })
  sideEffects: string[];

  @Column({ type: 'text', array: true })
  indications: string[];
}
