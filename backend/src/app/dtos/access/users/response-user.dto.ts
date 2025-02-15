import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../../../common/enum/role.enum';

export class RoleDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty({ enum: RoleEnum })
  public slug: RoleEnum;
}
export class ResponseUserDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public email: string;

  @ApiProperty()
  public createdAt: Date;

  @ApiProperty()
  public updatedAt: Date;

  @ApiProperty({ type: RoleDto })
  public role: RoleDto;
}
