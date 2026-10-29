import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../../domain/driver/driver';
import { Vehicle } from '../../../domain/driver/vehicle';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { VehicleRepository } from '../../../infrastructure/database/repositories/vehicle.repository';
import { DriverDeleteController } from './delete.controller';
import { DriverDeleteHandler } from './delete.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Vehicle])],
  controllers: [DriverDeleteController],
  providers: [DriverRepository, VehicleRepository, DriverDeleteHandler],
  exports: [DriverDeleteHandler],
})
export class DriverDeleteModule {}
