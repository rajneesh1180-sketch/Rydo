import { Module } from '@nestjs/common';
import { UserSaveModule } from './register-user/register-user.module';
import { UserGetModule } from './get-user/get-user.module';
import { UserUpdateModule } from './update -user/update-user.module';
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
