import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateWorkspaceDto } from '../dtos/workspace/update-workspace.dto';
import Workspace from '@entities/workspace/workspace.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import File from '@entities/file.entity';
import User from '@entities/access/user.entity';
import { randomUUID } from 'crypto';
import WorkspaceRole from '@entities/workspace/permissions/workspace-role.entity';
import { WorkspaceMemberRole } from '@common/enum/role.enum';
import WorkspaceMember from '@entities/workspace/workspace-members.entity';
import { Theme } from '@entities/documents/theme.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly entityManager: EntityManager,

    @InjectRepository(Workspace)
    private readonly workspaceRepository: Repository<Workspace>,
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
    @InjectRepository(WorkspaceMember)
    private readonly workspaceMemberRepository: Repository<WorkspaceMember>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(WorkspaceRole)
    private readonly workspaceMemberRoleRepository: Repository<WorkspaceRole>,
  ) {}

  async accepteInvite(workspaceId: string, code: string, user: User) {
    const member = await this.workspaceMemberRepository.findOne({
      where: {
        workspaceId,
        userId: user.id,
      },
    });

    if (member) return;

    const workspace = await this.workspaceRepository.findOneOrFail({
      where: {
        id: workspaceId,
        inviteCode: code,
      },
      relations: {
        workspaceMembers: true,
      },
    });

    const workspaceMember = this.workspaceMemberRepository.create({
      id: randomUUID(),
      userId: user.id,
      workspaceId,
      role: await this.workspaceMemberRoleRepository.findOneBy({
        slug: WorkspaceMemberRole.MEMBER,
      }),
    });

    await this.entityManager.transaction(async (tr) => {
      await tr.insert(WorkspaceMember, workspaceMember);

      workspace.workspaceMembers.push(workspaceMember);

      await tr.save(workspace);
    });
  }

  async excludeMember(workspaceId: string, memberId: string, user: User) {
    const [workspace, member] = await Promise.all([
      this.workspaceRepository.findOneOrFail({
        where: {
          id: workspaceId,
          ownerId: user.id,
        },
        relations: {
          workspaceMembers: true,
        },
      }),
      this.workspaceMemberRepository.findOne({
        where: {
          userId: memberId,
          workspaceId,
        },
      }),
    ]);

    await this.entityManager.transaction(async (tr) => {
      await tr.save({
        ...workspace,
        workspaceMembers: workspace.workspaceMembers.filter(
          (el) => el.id !== member.id,
        ),
      });

      await tr.delete(WorkspaceMember, { id: member.id });
    });
  }

  async findOne(id: string) {
    const workspace = await this.workspaceRepository.findOne({
      where: {
        id,
      },
      relations: {
        workspaceMembers: true,
        folders: true,
        theme: true,
        owner: true,
        logo: true,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace Not Found');
    }

    return workspace;
  }

  async update(id: string, data: UpdateWorkspaceDto) {
    const workspace = await this.findOne(id);

    if (data.logoId) {
      const file = await this.fileRepository.findOneByOrFail({
        id: data.logoId,
      });
      workspace.logo = file;
    }

    if (data.themeId) {
      const theme = await this.themeRepository.findOneByOrFail({
        id: data.themeId,
      });
      workspace.theme = theme;
    }

    if (data.name) {
      workspace.name = data.name;
    }

    return this.workspaceRepository.save(workspace);
  }
}
