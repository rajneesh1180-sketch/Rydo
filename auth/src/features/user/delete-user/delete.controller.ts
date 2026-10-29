import { Controller, Delete, HttpStatus, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { UserDeleteHandler } from './delete.service';
import { UserDeleteCommand } from './delete.command';

@Controller('users')
export class UserDeleteController {
  constructor(private readonly handler: UserDeleteHandler) {}

  @Delete(':uuid')
  async delete(
    @Param('uuid') uuid: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const command = new UserDeleteCommand(uuid);
    await this.handler.handle(command);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    });
  }
}
