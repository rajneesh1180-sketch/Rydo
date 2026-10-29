import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { DriverSaveHandler } from './save.service';
import { SaveDriverDto } from './save.dto';
import { SaveDriverCommand } from './save.command';

@Controller('drivers')
export class DriverSaveController {
  constructor(private readonly handler: DriverSaveHandler) {}

  @Post()
  async handle(
    @Body() dto: SaveDriverDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const command = new SaveDriverCommand(dto);
    const driver = await this.handler.handle(command);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Driver information saved successfully',
      data: driver,
    });
  }
}
