import { Roles } from '@common/decorators/roles.decorator';
import { RoleEnum } from '@common/enum/role.enum';
import { JwtAuthGuard } from '@common/guard/jwt-auth.guard';
import { RolesGuard } from '@common/guard/permission.guard';
import {
  ApiGetAllResponse,
  ApiGetOneResponse,
} from '@common/http/responses/api-ok-response';
import { CreateUserDto } from '@dto/access/users/create-user.dto';
import { UpdateUserDto } from '@dto/access/users/update-user.dto';
import { PageMetaDto } from '@dto/page/dto/page-meta.dto';
import { PageOptionsDto } from '@dto/page/dto/page-options.dto';
import { PageDto } from '@dto/page/dto/page.dto';
import Role from '@entities/access/roles.entity';
import User from '@entities/access/user.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '@services/access/users.service';

@ApiTags('Users')
@ApiExtraModels(User)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('admin/users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Добавить пользователя' })
  @ApiGetOneResponse(User)
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  @Roles(RoleEnum.ADMIN, RoleEnum.MODERATOR)
  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiGetAllResponse(User)
  async findAll(@Query() page: PageOptionsDto) {
    const [users, total] = await this.userService.findAll(page);

    return new PageDto(
      users,
      new PageMetaDto({
        pageOptionsDto: page,
        itemCount: total,
      }),
    );
  }

  @Get('roles')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Получить все роли' })
  @ApiGetAllResponse(Role)
  async findAllRoles() {
    return this.userService.findAllRoles();
  }

  @Put(':roleId/:userId/roles')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Обновить роль пользователя' })
  @ApiGetAllResponse(User)
  async updateUserRole(
    @Param('roleId') roleId: string,
    @Param('userId') userId: string,
  ) {
    return this.userService.updateUserRole(userId, roleId);
  }

  @Get(':id')
  @Roles(RoleEnum.ADMIN, RoleEnum.MODERATOR)
  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Обновить пользователя' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  @Roles(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
