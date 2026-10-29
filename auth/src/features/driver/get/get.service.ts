import { Injectable, NotFoundException } from '@nestjs/common';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { Driver } from '../../../domain/driver/driver';
import { DriverGetCommand } from './get.command';

@Injectable()
export class DriverGetHandler {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async handle(command: DriverGetCommand): Promise<Driver> {
    const { uuid } = command;
    const driver = await this.driverRepository.findByIdentifier(uuid);
    if (!driver) {
      throw new NotFoundException(`Driver not found with identifier '${uuid}'`);
    }
    return driver;
  }
}
