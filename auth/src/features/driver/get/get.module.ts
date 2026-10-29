import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../../../domain/driver/driver';
import { Vehicle } from '../../../domain/driver/vehicle';
import { DriverRepository } from '../../../infrastructure/database/repositories/driver.repository';
import { VehicleRepository } from '../../../infrastructure/database/repositories/vehicle.repository';
import { DriverGetController } from './get.controller';
import { DriverGetHandler } from './get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Vehicle])],
  controllers: [DriverGetController],
  providers: [DriverRepository, VehicleRepository, DriverGetHandler],
  exports: [DriverGetHandler],
})
export class DriverGetModule {}
