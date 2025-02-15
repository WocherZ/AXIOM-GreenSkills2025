import { faker } from '@faker-js/faker';
import * as argon from 'argon2';
import { randomUUID } from 'crypto';

import Role from '../entities/access/roles.entity';
import User from '../entities/access/user.entity';
import { RoleEnum } from '@common/enum/role.enum';

export default class UserFactory {
  public static async create(props: { role?: Role }) {
    return new User({
      id: randomUUID(),
      firstName: faker.person.firstName(),
      lastName: faker.person.firstName(),
      email:
        props.role.slug === RoleEnum.USER
          ? faker.internet.email()
          : `${props.role.slug}.pbr@gmail.com`,
      password: await argon.hash('pa$sW0rd'),
      role: props.role,
    });
  }

  public static async createMany(roles: Role[]) {
    const users: User[] = [];

    for (const role of roles) {
      if (role.slug === RoleEnum.USER) {
        for (let index = 0; index <= 10; index++) {
          users.push(await UserFactory.create({ role }));
        }
      } else {
        users.push(await UserFactory.create({ role }));
      }
    }

    return users;
  }
}
