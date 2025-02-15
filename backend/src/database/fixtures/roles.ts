import { RoleEnum, WorkspaceMemberRole } from '../../common/enum/role.enum';

export const rolesFixture = [
  {
    name: 'Администратор',
    slug: RoleEnum.ADMIN,
  },
  {
    name: 'Модератор',
    slug: RoleEnum.MODERATOR,
  },
  {
    name: 'Пользователь',
    slug: RoleEnum.USER,
  },
];

export const workspaceMemberRolesFixture = [
  {
    name: 'Администратор',
    slug: WorkspaceMemberRole.ADMIN,
  },
  {
    name: 'Гость',
    slug: WorkspaceMemberRole.MEMBER,
  },
];
