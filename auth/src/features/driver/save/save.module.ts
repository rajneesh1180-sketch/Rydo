import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../../domain/driver/driver';
import { Vehicle } from '../../../domain/driver/vehicle';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { VehicleRepository } from '../../../infrastructure/database/repositories/vehicle.repository';
import { DriverSaveController } from './save.controller';
import { DriverSaveHandler } from './save.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Vehicle])],
  controllers: [DriverSaveController],
  providers: [DriverRepository, VehicleRepository, DriverSaveHandler],
  exports: [DriverSaveHandler],
})
export class DriverSaveModule {}
