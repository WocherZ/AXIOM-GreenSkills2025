import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { hash, argon2id, verify } from 'argon2';
import { randomBytes, randomUUID } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';

import { RoleEnum, WorkspaceMemberRole } from '../../../common/enum/role.enum';
import User from '../../../database/entities/access/user.entity';
import Role from '../../../database/entities/access/roles.entity';
import { AuthLoginDto } from '../../dtos/access/auth/login.dto';
import UserPasswordReset from '../../../database/entities/access/user-password-reset.entity';
import { getHashStringGenerateOnDate } from '../../helpers/get-hash-string.helper';
import {
  AuthChangePasswordDto,
  AuthRegisterDto,
  AuthResetPasswordDto,
} from '../../dtos/access/auth/auth.dto';
import { transliterate as trn } from 'transliteration';
import Workspace from '@entities/workspace/workspace.entity';
import WorkspaceMember from '@entities/workspace/workspace-members.entity';
import {
  AccessLinkPermissionEnum,
  WorkspaceMemberPermissionEnum,
} from '@common/enum/permission.enum';
import WorkspaceRole from '@entities/workspace/permissions/workspace-role.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly entityManager: EntityManager,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Workspace)
    private readonly orgRepository: Repository<Workspace>,
    @InjectRepository(WorkspaceRole)
    private readonly workspaceMemberRoleRepository: Repository<WorkspaceRole>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserPasswordReset)
    private readonly passwordResetRepository: Repository<UserPasswordReset>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return hash(password, {
      type: argon2id,
    });
  }

  getTokens(payload: any) {
    return {
      accessToken: this.jwtService.sign(payload),
      expiresIn: process.env.TOKEN_EXPIRES_IN,
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN_STRING,
        secret: process.env.JWT_REFRESH_KEY,
      }),
    };
  }

  async createUserWorkspaceIfNotExist(user: User) {
    const { id, firstName, lastName } = user;

    const existOrg = await this.orgRepository
      .createQueryBuilder('org')
      .where('org.owner_id = :userId', { userId: id })
      .getOne();

    if (!existOrg) {
      await this.entityManager.transaction(async (tr) => {
        const orgId = randomUUID();
        const hashString = randomBytes(10).toString('hex').slice(0, 15);

        const workspace = tr.create(Workspace, {
          id: orgId,
          name: `${firstName} ${lastName} Workspace`,
          slug: `${trn(firstName)}-${trn(lastName)}-workspace-${orgId}`,
          inviteCode: hashString,
          owner: user,
          workspaceMemberPermission: WorkspaceMemberPermissionEnum.VIEW,
          accessLinkPermission: AccessLinkPermissionEnum.VIEW,
        });

        await tr.insert(Workspace, workspace);

        const members = tr.create(WorkspaceMember, {
          id: randomUUID(),
          user,
          workspace,
          role: await this.workspaceMemberRoleRepository.findOneBy({
            slug: WorkspaceMemberRole.ADMIN,
          }),
        });

        await tr.insert(WorkspaceMember, members);

        workspace.workspaceMembers = [members];

        await tr.save(Workspace, workspace);
      });
    }
  }

  async register(data: AuthRegisterDto) {
    const { email, password, firstName, lastName } = data;

    await this.checkEmailUnique(email);

    const user = await this.userRepository.save({
      id: randomUUID(),
      firstName,
      lastName,
      password: await this.hashPassword(password),
      email,
      role: await this.roleRepository.findOneBy({
        slug: RoleEnum.USER,
      }),
    });

    await this.createUserWorkspaceIfNotExist(user);
  }

  async checkEmailUnique(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (user) {
      throw new BadRequestException('Email mast be unique');
    }
  }

  async login(data: AuthLoginDto) {
    const { email, password } = data;
    const user = await this.userRepository
      .createQueryBuilder('u')
      .addSelect('u.password')
      .where('u.email = :email', { email })
      .leftJoinAndSelect('u.role', 'role')
      .getOne();

    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }

    if (!(await verify(user.password, password))) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, sub: user.id };

    const tokens = this.getTokens(payload);

    await this.createUserWorkspaceIfNotExist(user);
    await this.userRepository.update(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async refreshToken(refreshToken: string) {
    const refreshTokenPayload = this.jwtService.verify<{
      sub: string;
    }>(refreshToken, { secret: process.env.JWT_REFRESH_KEY });
    const payload = {
      sub: refreshTokenPayload.sub,
    };

    const tokens = this.getTokens(payload);

    await this.userRepository.update(refreshTokenPayload.sub, {
      refreshToken: tokens.refreshToken,
    });

    return this.getTokens(payload);
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: {
        passwordReset: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const emailHash = getHashStringGenerateOnDate(user.email);

    if (user.passwordReset) {
      await this.passwordResetRepository.delete(user.passwordReset.id);
    }

    user.passwordReset = new UserPasswordReset();
    user.passwordReset.id = randomUUID();
    user.passwordReset.hash = emailHash;

    await this.userRepository.save({
      id: user.id,
      passwordReset: user.passwordReset,
    });

    await this.mailerService
      .sendMail({
        to: user.email,
        from: process.env.SMTP_FROM,
        subject: 'Восстановление пароля',
        html: `<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Reset</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      margin: 0;
                      padding: 0;
                      background-color: #f5f5f5;
                  }
                  .container {
                      max-width: 600px;
                      margin: 0 auto;
                      padding: 20px;
                      background-color: #fff;
                      border-radius: 4px;
                      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                  }
                  h1 {
                      color: #333;
                      margin: 0 0 20px;
                  }
                  p {
                      color: #666;
                      line-height: 1.5;
                      margin: 0 0 20px;
                  }
                  a {
                      display: inline-block;
                      color: #fff;
                      background-color: #337ab7;
                      padding: 10px 20px;
                      border-radius: 4px;
                      text-decoration: none;
                      text-align: center;
                      margin: 20px 0;
                  }
                  a:hover {
                      background-color: #286090;
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>Password Reset</h1>
                  <p>Hello,</p>
                  <p>We received a request to reset the password for your account. If you did not make this request, please ignore this email.</p>
                  <p>To reset your password, please click the button below:</p>
                  <a href="${process.env.FRONTEND_URL}/reset-password?hash=${emailHash}&email=${email}">Reset Password</a>
                  <p>If you have any questions or need further assistance, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
                  <p>Best regards,</p>
                  <p>The Example Team</p>
              </div>
          </body>
          </html`,
      })
      .catch((err) => {
        this.logger.error(err.message);
        // throw new BadRequestException(err);
      });
  }

  async changePassword(id: string, data: AuthChangePasswordDto) {
    const { newPassword, repeatPassword } = data;

    if (newPassword !== repeatPassword) {
      throw new BadRequestException('Passwords not equal');
    }

    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    await this.userRepository.save({
      id: user.id,
      password: await this.hashPassword(newPassword),
    });
  }

  async logout(user: User) {
    await this.userRepository.update(user.id, {
      refreshToken: null,
    });
  }

  async resetPassword(data: AuthResetPasswordDto) {
    const { email, password, retryPassword } = data;

    if (password !== retryPassword) {
      throw new BadRequestException('Passwords not equal');
    }

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
      relations: ['passwordReset'],
    });

    if (!user) {
      throw new BadRequestException('Failed to change password');
    }

    if (!user.passwordReset) {
      throw new BadRequestException('Link expired');
    }

    if (user.passwordReset.hash !== data.hash) {
      throw new BadRequestException('Link expired');
    }

    await Promise.all([
      this.userRepository.save({
        id: user.id,
        password: await this.hashPassword(password),
      }),
      this.passwordResetRepository.delete(user.passwordReset.id),
    ]);
  }
}
