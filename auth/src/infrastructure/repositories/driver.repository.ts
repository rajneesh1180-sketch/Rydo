import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Driver } from '../../../domain/driver/driver';

@Injectable()
export class DriverRepository extends Repository<Driver> {
  constructor(private readonly dataSource: DataSource) {
    super(Driver, dataSource.createEntityManager());
  }

  public async findById(id: number): Promise<Driver | null> {
    return this.findOne({
      where: { id },
      relations: {
        vehicle: true,
      },
    });
  }

  public async findByUuid(uuid: string): Promise<Driver | null> {
    return this.findOne({
      where: { uuid },
      relations: {
        vehicle: true,
      },
    });
  }

  public async findByFirebaseUid(firebase_uid: string): Promise<Driver | null> {
    return this.findOne({
      where: { firebase_uid },
      relations: {
        vehicle: true,
      },
    });
  }

  public async findByEmail(email: string): Promise<Driver | null> {
    return this.findOne({
      where: { email },
      relations: {
        vehicle: true,
      },
    });
  }

  public async findByPhone(phone: string): Promise<Driver | null> {
    return this.findOne({
      where: { phone },
      relations: {
        vehicle: true,
      },
    });
  }

  public async findByIdentifier(identifier: string): Promise<Driver | null> {
    if (/^\d+$/.test(identifier)) {
      const driver = await this.findById(Number(identifier));
      if (driver) return driver;
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (uuidRegex.test(identifier)) {
      const driver = await this.findByUuid(identifier);
      if (driver) return driver;
    }

    if (identifier.includes('@')) {
      const driver = await this.findByEmail(identifier);
      if (driver) return driver;
    }

    const driverByFirebase = await this.findByFirebaseUid(identifier);
    if (driverByFirebase) return driverByFirebase;

    return this.findByPhone(identifier);
  }

  public async existsByEmail(email: string): Promise<boolean> {
    const count = await this.count({ where: { email } });
    return count > 0;
  }

  public async existsByPhone(phone: string): Promise<boolean> {
    const count = await this.count({ where: { phone } });
    return count > 0;
  }

  public async saveDriverDetails(data: Partial<Driver>): Promise<Driver> {
    return this.save(data);
  }
}
