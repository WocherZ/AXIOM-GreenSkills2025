import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty()
  @IsEmail()
  public email: string;

  @ApiProperty({ default: 'pa$sW0rd' })
  @IsString()
  public password: string;
}
