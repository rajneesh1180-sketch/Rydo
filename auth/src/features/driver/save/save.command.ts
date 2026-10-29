import { SaveDriverDto } from './save.dto';

export class SaveDriverCommand {
  constructor(public readonly driver: SaveDriverDto) {}
}
