import { randomUUID } from 'crypto';
import { RoleEnum } from '../../common/enum/role.enum';
import Role from '../entities/access/roles.entity';
import { rolesFixture } from '../fixtures/roles';

export default class RolesFactory {
  public static create(props: { name: string; slug: string }) {
    return new Role({
      id: randomUUID(),
      name: props.name,
      slug: props.slug as unknown as RoleEnum,
    });
  }

  public static createMany(): Role[] {
    return rolesFixture.map((item) => {
      return RolesFactory.create(item);
    });
  }
}
