import { Module } from '@nestjs/common';
import { DriverSaveModule } from './save/save.module';
import { DriverGetModule } from './get/get.module';
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
