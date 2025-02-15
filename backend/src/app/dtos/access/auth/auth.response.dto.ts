import { ApiResponseProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken: string;

  @ApiResponseProperty()
  expiresIn: number;

  @ApiResponseProperty()
  refreshExpiresIn: number;
}
