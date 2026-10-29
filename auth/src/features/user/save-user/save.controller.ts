import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { SaveUserDto } from './save.dto';
import { SaveUserCommand } from './save.command';
import { UserSaveHandler } from './save.service';

@Controller('users')
export class UserSaveController {
  constructor(private readonly handler: UserSaveHandler) {}

  @Post()
  async handle(
    @Body() data: SaveUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const command = new SaveUserCommand(data);
      
    const user = await this.handler.handle(command);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User information saved successfully',
      data: user,
    });
  }
}
