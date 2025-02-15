import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class UpdateWorkspaceDto {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsUUID('4')
  public logoId: string;

  @ApiProperty()
  @IsUUID('4')
  public themeId: string;

  @ApiProperty()
  @IsUUID('4')
  public workspacePermissionId: string;

  @ApiProperty()
  @IsUUID('4')
  public accessLinkPermissionId: string;
}
