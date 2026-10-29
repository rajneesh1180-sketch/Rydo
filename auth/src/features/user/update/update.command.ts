import { UpdateUserDto } from './update.dto';

export class UpdateUserCommand {
  constructor(
    public readonly uuid: string,
    public readonly data: UpdateUserDto,
  ) {}
}