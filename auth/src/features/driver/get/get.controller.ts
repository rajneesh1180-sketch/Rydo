import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { DriverGetHandler } from './get.service';
import { DriverGetCommand } from './get.command';

@Controller('drivers')
export class DriverGetController {
  constructor(private readonly handler: DriverGetHandler) {}

  @Get(':uuid')
  async getOne(
    @Param('uuid') uuid: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const command = new DriverGetCommand(uuid);
    const driver = await this.handler.handle(command);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Driver information retrieved successfully',
      data: driver,
    });
  }
}
