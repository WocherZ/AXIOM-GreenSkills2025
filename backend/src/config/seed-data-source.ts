import Role from '@entities/access/roles.entity';
import UserPasswordReset from '@entities/access/user-password-reset.entity';
import User from '@entities/access/user.entity';
import Workspace from '@entities/workspace/workspace.entity';
import WorkspaceMember from '@entities/workspace/workspace-members.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import WorkspaceRole from '@entities/workspace/permissions/workspace-role.entity';
import File from '@entities/file.entity';
import { Font } from '@entities/documents/font.entity';
import { Theme } from '@entities/documents/theme.entity';
import Slide from '@entities/documents/slide.entity';
import Document from '@entities/documents/docs.entity';
import DocGenerateInput from '@entities/documents/draft-document.entity';
import Folder from '@entities/workspace/folders.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    Role,
    File,
    User,
    UserPasswordReset,
    Workspace,
    WorkspaceMember,
    WorkspaceRole,
    Document,
    DocGenerateInput,
    Folder,
    Font,
    Theme,
    Slide,
  ],
  seeds: ['src/database/seeds/*.seed{.ts,.js}'],
};

export const seedDataSource = new DataSource(options);

(async () => {
  await seedDataSource.initialize();
  /*
    Странное поведение, если вызвать runSeeders то он вызывается дважды
    Видимо при старте скрипта npm он вызывается автоматом и еще тут
  */
  // runSeeders(seedDataSource);
})();
