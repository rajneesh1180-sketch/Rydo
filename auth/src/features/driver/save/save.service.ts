import { ConflictException, Injectable } from '@nestjs/common';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { VehicleRepository } from '../../../infrastructure/database/repositories/vehicle.repository';
import { Driver } from '../../../domain/driver/driver';
import { Vehicle } from '../../../domain/driver/vehicle';
import { SaveDriverCommand } from './save.command';

@Injectable()
export class DriverSaveHandler {
  constructor(
    private readonly driverRepository: DriverRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {}

  public async handle(command: SaveDriverCommand): Promise<Driver> {
    const { vehicle: vehicleDto, ...driverData } = command.driver;

    let driver: Driver | null = null;

    if (driverData.firebase_uid) {
      driver = await this.driverRepository.findByFirebaseUid(
        driverData.firebase_uid,
      );
    }

    if (!driver && driverData.email) {
      driver = await this.driverRepository.findByEmail(driverData.email);
    }

    if (driver) {
      Object.assign(driver, driverData);

      if (vehicleDto) {
        if (driver.vehicle) {
          Object.assign(driver.vehicle, vehicleDto);
          await this.vehicleRepository.saveVehicleDetails(driver.vehicle);
        } else {
          await this.validateUniqueVehicleFields(vehicleDto);
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

    if (driverData.phone) {
      const phoneExists = await this.driverRepository.existsByPhone(
        driverData.phone,
      );
      if (phoneExists) {
        throw new ConflictException('Phone number is already in use');
      }
    }

    let vehicleEntity: Vehicle | undefined;
    if (vehicleDto) {
      await this.validateUniqueVehicleFields(vehicleDto);
      vehicleEntity = this.vehicleRepository.create(vehicleDto);
    }

    const newDriver = this.driverRepository.create({
      ...driverData,
      vehicle: vehicleEntity,
    });

    return this.driverRepository.saveDriverDetails(newDriver);
  }

  private async validateUniqueVehicleFields(vehicleDto: {
    plate_number?: string;
    license_number?: string;
    insurance_number?: string;
  }): Promise<void> {
    if (vehicleDto.plate_number) {
      const plate = await this.vehicleRepository.findByPlateNumber(
        vehicleDto.plate_number,
      );
      if (plate) {
        throw new ConflictException('Vehicle plate number is already registered');
      }
    }

    if (vehicleDto.license_number) {
      const license = await this.vehicleRepository.findByLicenseNumber(
        vehicleDto.license_number,
      );
      if (license) {
        throw new ConflictException(
          'Vehicle license number is already registered',
        );
      }
    }

    if (vehicleDto.insurance_number) {
      const insurance = await this.vehicleRepository.findByInsuranceNumber(
        vehicleDto.insurance_number,
      );
      if (insurance) {
        throw new ConflictException(
          'Vehicle insurance number is already registered',
        );
      }
    }
  }
}
