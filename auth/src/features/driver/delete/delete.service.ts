import { Injectable, NotFoundException } from '@nestjs/common';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { DriverDeleteCommand } from './delete.command';

@Injectable()
export class DriverDeleteHandler {
  constructor(private readonly driverRepository: DriverRepository) {}

  public async handle(command: DriverDeleteCommand): Promise<void> {
    const { uuid } = command;
    const driver = await this.driverRepository.findByIdentifier(uuid);
    if (!driver) {
      throw new NotFoundException(`Driver not found with identifier '${uuid}'`);
    }

    await this.driverRepository.remove(driver);
  }
}
