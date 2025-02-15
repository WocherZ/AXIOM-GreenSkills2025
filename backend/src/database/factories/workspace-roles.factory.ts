import { randomUUID } from 'crypto';
import WorkspaceRole from '@entities/workspace/permissions/workspace-role.entity';
import { WorkspaceMemberRole } from '@common/enum/role.enum';
import { workspaceMemberRolesFixture } from '../fixtures/roles';

export default class WorkspaceRolesFactory {
  public static create(props: { name: string; slug: string }) {
    return new WorkspaceRole({
      id: randomUUID(),
      name: props.name,
      slug: props.slug as unknown as WorkspaceMemberRole,
    });
  }

  public static createMany(): WorkspaceRole[] {
    return workspaceMemberRolesFixture.map((item) => {
      return WorkspaceRolesFactory.create(item);
    });
  }
}
