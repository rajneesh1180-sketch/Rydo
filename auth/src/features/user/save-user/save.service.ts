import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { Users } from '../../../domain/user/user';
import { SaveUserCommand } from './save.command';

@Injectable()
export class UserSaveHandler {
  constructor(private readonly userRepository: UserRepository) {}

  public async handle(command: SaveUserCommand): Promise<Users> {
    const { user: userData } = command;

    if (userData.phone) {
      const phoneExists = await this.userRepository.existsByPhone(userData.phone);
      if (phoneExists) {
        throw new ConflictException('Phone number is already in use');
      }
    }

    if (userData.email) {
      const emailExists = await this.userRepository.existsByEmail(userData.email);
      if (emailExists) {
        throw new ConflictException('Email is already in use');
      }
    }

    const newUser = this.userRepository.create(userData);
    return this.userRepository.saveUserDetails(newUser);
  }
}
