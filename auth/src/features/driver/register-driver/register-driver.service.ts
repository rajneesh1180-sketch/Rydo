import { ConflictException, Injectable } from '@nestjs/common';
import { DriverRepository } from '../../../infrastructure/repositories/driver.repository';
import { VehicleRepository } from '../../../infrastructure/repositories/vehicle.repository';
import { Driver } from '../../../domain/driver/driver';
import { SaveDriverCommand } from './register-driver.command';

@Injectable()
export class DriverSaveHandler {
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) { }

  public async handle(command: SaveDriverCommand) {
    const { vehicle: vehicleDto, ...driverData } = command.driver;



  }
}
