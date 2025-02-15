import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { FolderService } from '../services/folder.service';
import { ReqUser } from '@common/decorators/user.decorator';
import User from '@entities/access/user.entity';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { CreateFolderDto } from '@dto/folder/create-folder.dto';
import { UpdateFolderDto } from '@dto/folder/update-folder.dto';
import Folder from '@entities/workspace/folders.entity';

@ApiTags('Folders')
@ApiExtraModels(Folder)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('folders')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Post()
  @ApiOperation({ summary: 'Создать папку' })
  @ApiResponse({ status: 200, type: Folder })
  @ApiResponse({
    status: 400,
    description: 'Название папки должно быть уникальным',
  })
  create(@Body() data: CreateFolderDto, @ReqUser() user: User) {
    return this.folderService.create(data, user);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список своих папок' })
  @ApiResponse({ status: 200, type: [Folder] })
  findAll(@ReqUser() user: User) {
    return this.folderService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить папку по id' })
  @ApiResponse({ status: 200, type: Folder })
  findOne(@Param('id') id: string, @ReqUser() user: User) {
    return this.folderService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить папку по id' })
  @ApiResponse({
    status: 400,
    description: 'Название папки должно быть уникальным',
  })
  @ApiResponse({ status: 200, type: Folder })
  update(
    @Param('id') id: string,
    @Body() data: UpdateFolderDto,
    @ReqUser() user: User,
  ) {
    return this.folderService.update(id, data, user);
  }

  @Patch(':id/add-member/:memberId')
  @ApiOperation({ summary: 'Добавить пользователя своего workspace в папку' })
  addMemberToFolder(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
    @ReqUser() user: User,
  ) {
    return this.folderService.addMemberToFolder(id, memberId, user);
  }

  @Patch(':id/remove-member/:memberId')
  @ApiOperation({ summary: 'Удалить пользователя своего workspace из папку' })
  removeMemberFromFolder(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
    @ReqUser() user: User,
  ) {
    return this.folderService.removeMemberFromFolder(id, memberId, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ReqUser() user: User) {
    return this.folderService.remove(id, user);
  }
}
