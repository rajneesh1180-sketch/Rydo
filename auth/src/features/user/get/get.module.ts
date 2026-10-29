import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../../domain/user/user';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { UserGetController } from './get.controller';
import { UserGetHandler } from './get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UserGetController],
  providers: [UserRepository, UserGetHandler],
  exports: [UserGetHandler],
})
export class UserGetModule {}
