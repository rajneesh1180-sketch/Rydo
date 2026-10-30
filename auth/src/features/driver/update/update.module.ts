import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../../domain/driver/driver';
import { Vehicle } from '../../../domain/driver/vehicle';
import { DriverRepository } from '../../../infrastructure/repositories/driver.repository';
import { VehicleRepository } from '../../../infrastructure/repositories/vehicle.repository';
import { DriverUpdateController } from './update.controller';
import { DriverUpdateHandler } from './update.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Vehicle])],
  controllers: [DriverUpdateController],
  providers: [DriverRepository, VehicleRepository, DriverUpdateHandler],
  exports: [DriverUpdateHandler],
})
export class DriverUpdateModule {}
