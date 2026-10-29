import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { Users } from '../../../domain/user/user';
import { UpdateUserCommand } from './update.command';

@Injectable()
export class UserUpdateHandler {
  constructor(private readonly userRepository: UserRepository) {}

  public async handle(command: UpdateUserCommand): Promise<Users> {
    const { uuid, data } = command;
    const user = await this.userRepository.findByIdentifier(uuid);
    if (!user) {
      throw new NotFoundException(`User not found with identifier '${uuid}'`);
    }

    if (data.email && data.email !== user.email) {
      const emailExists = await this.userRepository.existsByEmail(data.email);
      if (emailExists) {
        throw new ConflictException('Email is already in use');
      }
    }

    if (data.phone && data.phone !== user.phone) {
      const phoneExists = await this.userRepository.existsByPhone(data.phone);
      if (phoneExists) {
        throw new ConflictException('Phone number is already in use');
      }
    }

    Object.assign(user, data);
    return this.userRepository.saveUserDetails(user);
  }
}
