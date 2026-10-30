import { Module } from '@nestjs/common';
import { DriverSaveModule } from './register-driver/register-driver.module';
import { DriverGetModule } from './get-driver/get-driver.module';
import { DriverUpdateModule } from './update/update.module';
import { DriverDeleteModule } from './delete/delete.module';

@Module({
  imports: [
    DriverSaveModule,
    DriverGetModule,
    DriverUpdateModule,
    DriverDeleteModule,
  ],
  exports: [
    DriverSaveModule,
    DriverGetModule,
    DriverUpdateModule,
    DriverDeleteModule,
  ],
})
export class DriverFeatureModule {}
