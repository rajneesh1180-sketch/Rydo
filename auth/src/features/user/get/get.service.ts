import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { Users } from '../../../domain/user/user';
import { UserGetCommand } from './get.command';

@Injectable()
export class UserGetHandler {
  constructor(private readonly userRepository: UserRepository) {}

  public async handle(command: UserGetCommand): Promise<Users> {
    const { uuid } = command;
    const user = await this.userRepository.findByIdentifier(uuid);
    if (!user) {
      throw new NotFoundException(`User not found with identifier '${uuid}'`);
    }
    return user;
  }
}
