import { Controller, Delete, HttpStatus, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { DriverDeleteHandler } from './delete.service';
import { DriverDeleteCommand } from './delete.command';

@Controller('drivers')
export class DriverDeleteController {
  constructor(private readonly handler: DriverDeleteHandler) {}

  @Delete(':uuid')
  async delete(
    @Param('uuid') uuid: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const command = new DriverDeleteCommand(uuid);
    await this.handler.handle(command);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Driver deleted successfully',
    });
  }
}
