import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../../infrastructure/database/repositories/user.repository';
import { UserDeleteCommand } from './delete.command';

@Injectable()
export class UserDeleteHandler {
  constructor(private readonly userRepository: UserRepository) { }

  public async handle(command: UserDeleteCommand) {
    const { uuid } = command;
    const user = await this.userRepository.findUser(uuid);
    if (!user) {
      throw new NotFoundException(`User not found with identifier '${uuid}'`);
    }

    await this.userRepository.remove(user);
  }
}
