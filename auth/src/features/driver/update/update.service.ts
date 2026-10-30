import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DriverRepository } from '../../../infrastructure/repositories/driver.repository';
import { VehicleRepository } from '../../../infrastructure/repositories/vehicle.repository';
import { Driver } from '../../../domain/driver/driver';
import { DriverUpdateCommand } from './update.command';

@Injectable()
export class DriverUpdateHandler {
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  public async handle(command: DriverUpdateCommand): Promise<Driver> {
    const { uuid, data } = command;
    const driver = await this.driverRepository.findByIdentifier(uuid);
    if (!driver) {
      throw new NotFoundException(
        `Driver not found with identifier '${uuid}'`,
      );
    }

    const { vehicle: vehicleDto, ...driverData } = data;

    if (driverData.email && driverData.email !== driver.email) {
      const emailExists = await this.driverRepository.existsByEmail(
        driverData.email,
      );
      if (emailExists) {
        throw new ConflictException('Email is already in use');
      }
    }

    if (driverData.phone && driverData.phone !== driver.phone) {
      const phoneExists = await this.driverRepository.existsByPhone(
        driverData.phone,
      );
      if (phoneExists) {
        throw new ConflictException('Phone number is already in use');
      }
    }

    Object.assign(driver, driverData);

    if (vehicleDto) {
      if (driver.vehicle) {
        Object.assign(driver.vehicle, vehicleDto);
        await this.vehicleRepository.saveVehicleDetails(driver.vehicle);
      } else {
        const newVehicle = this.vehicleRepository.create({
          ...vehicleDto,
          driver,
        });
        driver.vehicle = await this.vehicleRepository.saveVehicleDetails(
          newVehicle,
        );
      }
    }

    return this.driverRepository.saveDriverDetails(driver);
  }
}
