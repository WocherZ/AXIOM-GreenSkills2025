import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from '../services/workspace.service';
import { UpdateWorkspaceDto } from '../dtos/workspace/update-workspace.dto';
import { ReqUser } from '@common/decorators/user.decorator';
import User from '@entities/access/user.entity';
import Workspace from '@entities/workspace/workspace.entity';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';

@ApiTags('Worksapce')
@ApiExtraModels(Workspace)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post(':id/join/:code')
  @ApiOperation({ summary: 'Принять инвайт по ссылке приглашению' })
  @ApiResponse({ status: 201 })
  acceptInvite(
    @Param('id') id: string,
    @Param('code') code: string,
    @ReqUser() user: User,
  ) {
    return this.workspaceService.accepteInvite(id, code, user);
  }

  @Patch(':id/exclude/:memberId')
  excludeMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
    @ReqUser() user: User,
  ) {
    return this.workspaceService.excludeMember(id, memberId, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить по id' })
  @ApiResponse({ status: 200, type: Workspace })
  @ApiResponse({
    status: 404,
    description: 'Ресурс не найден',
  })
  findOne(@Param('id') id: string) {
    return this.workspaceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить ресурс по id' })
  @ApiResponse({
    status: 404,
    description: 'Ресурс не найден',
  })
  @ApiResponse({ status: 200, type: Workspace })
  update(@Param('id') id: string, @Body() data: UpdateWorkspaceDto) {
    return this.workspaceService.update(id, data);
  }
}
