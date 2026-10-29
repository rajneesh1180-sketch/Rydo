import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../domain/user/user';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { UserSaveController } from './save.controller';
import { UserSaveHandler } from './save.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserSaveController],
  providers: [UserRepository, UserSaveHandler],
  exports: [UserSaveHandler],
})
export class UserSaveModule {}
