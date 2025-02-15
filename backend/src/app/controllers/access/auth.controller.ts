import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Get,
  Patch,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UpdateProfileDto } from '../../dtos/access/users/update-user.dto';
import { ReqUser } from '../../../common/decorators/user.decorator';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import User from '../../../database/entities/access/user.entity';
import {
  AuthChangePasswordDto,
  AuthForgotPasswordDto,
  AuthRefreshTokenDto,
  AuthRegisterDto,
  AuthResetPasswordDto,
} from '../../dtos/access/auth/auth.dto';
import { AuthResponseDto } from '../../dtos/access/auth/auth.response.dto';
import { AuthLoginDto } from '../../dtos/access/auth/login.dto';
import { AuthService } from '../../services/access/auth.service';
import { UserService } from '../../services/access/users.service';

@ApiTags('Auth')
@ApiExtraModels(User)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Пользователь не найден',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Неверный логин или пароль',
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: AuthLoginDto) {
    return this.authService.login(data);
  }

  @Post('sign-up')
  @ApiResponse({
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Неверный логин или пароль',
  })
  async register(@Body() data: AuthRegisterDto) {
    return this.authService.register(data);
  }

  @Post('refresh-token')
  @ApiResponse({
    status: HttpStatus.OK,
    type: () => AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Неверный логин или пароль',
  })
  async refreshToken(@Body() data: AuthRefreshTokenDto) {
    return this.authService.refreshToken(data.refreshToken);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async forgotPassword(@Body() authForgotPasswordDto: AuthForgotPasswordDto) {
    await this.authService.forgotPassword(authForgotPasswordDto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async resetPassword(@Body() authResetPasswordDto: AuthResetPasswordDto) {
    await this.authService.resetPassword(authResetPasswordDto);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение пароля пользователя' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  @ApiResponse({ status: 401, description: 'Неверный пароль' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(
    @ReqUser() user: User,
    @Body() data: AuthChangePasswordDto,
  ) {
    await this.authService.changePassword(user.id, data);
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Получить свой профиль' })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  async getProfile(@ReqUser() user: User) {
    return user;
  }

  @Patch('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Обновить свой профиль' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  updateProfile(@ReqUser() user: User, @Body() data: UpdateProfileDto) {
    return this.usersService.updateProfile(data, user);
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Выйти из аккаунта' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  async logout(@ReqUser() user: User) {
    return this.authService.logout(user);
  }
}
