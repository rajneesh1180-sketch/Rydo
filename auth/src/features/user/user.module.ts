import { Module } from '@nestjs/common';
import { UserSaveModule } from './save-user/save.module';
import { UserGetModule } from './get/get.module';
import { UserUpdateModule } from './update/update.module';
import { UserDeleteModule } from './delete-user/delete.module';

@Module({
  imports: [
    UserSaveModule,
    UserGetModule,
    UserUpdateModule,
    UserDeleteModule,
  ],
  exports: [
    UserSaveModule,
    UserGetModule,
    UserUpdateModule,
    UserDeleteModule,
  ],
})
export class UserFeatureModule {}
