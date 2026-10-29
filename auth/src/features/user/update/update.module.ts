import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../domain/user/user';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { UserUpdateController } from './update.controller';
import { UserUpdateHandler } from './update.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserUpdateController],
  providers: [UserRepository, UserUpdateHandler],
  exports: [UserUpdateHandler],
})
export class UserUpdateModule {}
