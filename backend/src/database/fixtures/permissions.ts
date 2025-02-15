import {
  AccessLinkPermissionEnum,
  WorkspaceMemberPermissionEnum,
} from '@common/enum/permission.enum';

export const workspaceMemeberPermissionFixture = [
  {
    name: 'Полный доступ',
    description:
      'Может просматривать, комментировать, редактировать и делиться с другими',
    slug: WorkspaceMemberPermissionEnum.MANAGE,
  },
  {
    name: 'Редактировать',
    description:
      'Может просматривать, комментировать, редактировать, но не делиться с другими',
    slug: WorkspaceMemberPermissionEnum.EDIT,
  },
  {
    name: 'Комментарий',
    description: 'Может просматривать, комментировать, но не редактировать',
    slug: WorkspaceMemberPermissionEnum.COMMENT,
  },
  {
    name: 'Посмотреть',
    description: 'Может просматривать, но не комментировать или редактировать',
    slug: WorkspaceMemberPermissionEnum.VIEW,
  },
  {
    name: 'Нет доступа',
    description: 'Невозможно просмотреть, комментировать или редактировать',
    slug: WorkspaceMemberPermissionEnum.FORBIDDEN,
  },
];

export const accessLinkPermissionFixture = [
  {
    name: 'Редактировать',
    description:
      'Может просматривать, комментировать, редактировать, но не делиться с другими',
    slug: AccessLinkPermissionEnum.EDIT,
  },
  {
    name: 'Комментарий',
    description: 'Может просматривать, комментировать, но не редактировать',
    slug: AccessLinkPermissionEnum.COMMENT,
  },
  {
    name: 'Посмотреть',
    description: 'Может просматривать, но не комментировать или редактировать',
    slug: AccessLinkPermissionEnum.VIEW,
  },
  {
    name: 'Нет доступа',
    description: 'Невозможно просмотреть, комментировать или редактировать',
    slug: AccessLinkPermissionEnum.FORBIDDEN,
  },
];
