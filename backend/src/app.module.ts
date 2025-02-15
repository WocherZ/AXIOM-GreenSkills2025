import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import TypeOrmConfigService from './config/orm.config';
import { MailerModule } from '@nestjs-modules/mailer';
import SmtpConfigService from './config/mailer.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './app/controllers/access/auth.controller';
import { AuthService } from './app/services/access/auth.service';
import Role from './database/entities/access/roles.entity';
import User from './database/entities/access/user.entity';
import UserPasswordReset from './database/entities/access/user-password-reset.entity';
import { UserService } from './app/services/access/users.service';
import { UsersController } from './app/controllers/access/users.controller';
import { JwtStrategy } from './common/guard/jwt.strategy';
import File from './database/entities/file.entity';
import { FilesController } from './app/controllers/files.controller';
import { FilesService } from './app/services/files.service';
import { StorageService } from './modules/storage/storage.service';
// import { WsModule } from './modules/ws/ws.module';
import { RedisModule } from './modules/redis/redis.module';
// import { WebsocketController } from './app/controllers/ws/file.controller';
import { StorageModule } from './modules/storage/storage.module';
import Workspace from './database/entities/workspace/workspace.entity';
import { WorkspaceController } from '@controllers/workspace.controller';
import { FolderController } from '@controllers/folder.controller';
import { WorkspaceService } from '@services/workspace.service';
import { FolderService } from '@services/folder.service';
import { LlmModule } from './modules/llm/llm.module';
import WorkspaceRole from '@entities/workspace/permissions/workspace-role.entity';
import WorkspaceMember from '@entities/workspace/workspace-members.entity';
import Folder from '@entities/workspace/folders.entity';
import Document from '@entities/documents/docs.entity';
import DocGenerateInput from '@entities/documents/draft-document.entity';
import { DocsController } from '@controllers/docs.controller';
import { DocsService } from '@services/docs/docs.service';
import { FontService } from '@services/docs/fonts.service';
import { Theme } from '@entities/documents/theme.entity';
import { ThemeService } from '@services/docs/theme.service';
import { FontsController } from '@controllers/fonts.controller';
import { ThemeController } from '@controllers/theme.controller';
import { Font } from '@entities/documents/font.entity';
import Slide from '@entities/documents/slide.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MailerModule.forRootAsync({
      useClass: SmtpConfigService,
    }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRES_IN },
    }),
    TypeOrmModule.forFeature([
      Role,
      User,
      UserPasswordReset,
      File,
      Workspace,
      WorkspaceMember,
      WorkspaceRole,
      Folder,
      Document,
      DocGenerateInput,
      Slide,
      Theme,
      Font,
    ]),
    StorageModule,
    RedisModule,
    LlmModule,
    // WsModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    FilesController,
    // WebsocketController,
    WorkspaceController,
    FolderController,
    DocsController,
    FontsController,
    ThemeController,
  ],
  providers: [
    JwtStrategy,
    AuthService,
    UserService,
    FilesService,
    StorageService,
    WorkspaceService,
    FolderService,
    DocsService,
    FontService,
    ThemeService,
  ],
})
export class AppModule {}
