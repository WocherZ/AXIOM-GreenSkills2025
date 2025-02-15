import { Seeder } from 'typeorm-extension';

import { seedDataSource } from '../../config/seed-data-source';
import User from '../entities/access/user.entity';
import UserFactory from '../factories/user.factory';
import RolesFactory from '../factories/roles.factory';
import Role from '../entities/access/roles.entity';
import WorkspaceRolesFactory from '../factories/workspace-roles.factory';
import WorkspaceRole from '@entities/workspace/permissions/workspace-role.entity';
import FontsFactory from '../factories/fonts.factory';
import { Font } from '@entities/documents/font.entity';
import ThemesFactory from '../factories/themes.factory';
import { Theme } from '@entities/documents/theme.entity';

export default class DBSeed implements Seeder {
  public async run() {
    await this.commonSeed();
  }

  private async commonSeed() {
    const roles = RolesFactory.createMany();
    const rolesRepo = seedDataSource.getRepository(Role);
    const rolesEntity = await rolesRepo.save(roles);

    const workspaceMemberRoles = WorkspaceRolesFactory.createMany();
    const workspaceMemberRolesRepo =
      seedDataSource.getRepository(WorkspaceRole);
    await workspaceMemberRolesRepo.save(workspaceMemberRoles);

    const users = await UserFactory.createMany(rolesEntity);
    const usersRepo = seedDataSource.getRepository(User);
    await usersRepo.save(users);

    const fonts = FontsFactory.createMany();
    const fontRepo = seedDataSource.getRepository(Font);
    await fontRepo.save(fonts);

    const themes = ThemesFactory.createMany();
    const themesRepo = seedDataSource.getRepository(Theme);
    await themesRepo.save(themes);
  }
}
