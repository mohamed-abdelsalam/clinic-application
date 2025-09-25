import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { format } from 'date-fns';
import { Visit } from '@visits/entities/visit.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  phone: string;

  @Column()
  job: string;

  @Column({
    type: 'date',
    transformer: {
      to: (value: string | Date) => {
        if (typeof value === 'string') return value;
        return format(value, 'yyyy-MM-dd');
      },
      from: (value: Date) => format(value, 'yyyy-MM-dd'),
    },
  })
  dateOfBirth: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt: Date;

  @Column({ nullable: true })
  email?: string;

  @OneToMany(() => Visit, (visit) => visit.patient, { cascade: true })
  visits: Visit[];
}
