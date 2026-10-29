import { SaveUserDto } from './save.dto';

export class SaveUserCommand {
  constructor(public readonly user: SaveUserDto) {}
}