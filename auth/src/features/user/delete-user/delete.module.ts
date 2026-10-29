import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../domain/user/user';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { UserDeleteController } from './delete.controller';
import { UserDeleteHandler } from './delete.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserDeleteController],
  providers: [UserRepository, UserDeleteHandler],
  exports: [UserDeleteHandler],
})
export class UserDeleteModule {}
