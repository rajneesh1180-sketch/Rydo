import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { UserGetHandler } from './get.service';
import { UserGetCommand } from './get.command';

@Controller('users')
export class UserGetController {
  constructor(private readonly handler: UserGetHandler) {}

  @Get(':uuid')
  async getOne(
    @Param('uuid') uuid: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const command = new UserGetCommand(uuid);
    const user = await this.handler.handle(command);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'User information retrieved successfully',
      data: user,
    });
  }
}
