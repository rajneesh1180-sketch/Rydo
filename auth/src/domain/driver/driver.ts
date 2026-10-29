import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Status } from '../enums/status.enum';
import { Role } from '../enums/role.enum';
import { Vehicle } from './vehicle';

@Entity('driver')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ unique: true, nullable: true })
  firebase_uid?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true, nullable: true })
  phone?: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ type: 'date', nullable: true })
  dob?: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.DRIVER,
  })
  role: Role;

  @Column({ type: 'varchar', nullable: true })
  provider_id?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.driver, {
    cascade: true,
  })
  vehicle?: Vehicle;

  public isActive(): boolean {
    return this.status === Status.ACTIVE;
  }
}
