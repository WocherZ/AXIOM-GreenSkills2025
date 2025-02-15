import { IsString, IsOptional, IsEmail } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateProfileDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsEmail()
  public email: string;
}
