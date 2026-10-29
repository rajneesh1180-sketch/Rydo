import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Role } from '../../../domain/enums/role.enum';
import { Status } from '../../../domain/enums/status.enum';
import { UpdateVehicleDto } from '../dtos/update-vehicle.dto';

export class UpdateDriverDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @IsString()
  firebase_uid?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  provider_id?: string;

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateVehicleDto)
  vehicle?: UpdateVehicleDto;
}
