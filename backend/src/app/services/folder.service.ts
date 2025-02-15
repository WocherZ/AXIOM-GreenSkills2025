import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { transliterate as trn } from 'transliteration';
import User from '@entities/access/user.entity';
import { CreateFolderDto } from '@dto/folder/create-folder.dto';
import { UpdateFolderDto } from '@dto/folder/update-folder.dto';
import Folder from '@entities/workspace/folders.entity';
import WorkspaceMember from '@entities/workspace/workspace-members.entity';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
    @InjectRepository(WorkspaceMember)
    private readonly workspaceMemberRepository: Repository<WorkspaceMember>,
  ) {}

  async create(data: CreateFolderDto, user: User) {
    await this.findUniqFolderByName(data.name, user.workspace.id);
    const member = await this.workspaceMemberRepository.findOneByOrFail({
      userId: user.id,
    });

    const folder = this.folderRepository.create({
      id: randomUUID(),
      name: data.name,
      slug: trn(data.name),
      workspaceId: user.workspace.id,
      memberCount: 1,
      members: [member],
    });

    await this.folderRepository.insert(folder);
  }

  async findUniqFolderByName(name: string, workspaceId: string) {
    const folder = await this.folderRepository.findOneBy({ name, workspaceId });

    if (folder) {
      throw new BadRequestException('Folder name must be unique');
    }
  }

  findAll(user: User) {
    return this.folderRepository.find({
      where: { workspaceId: user.workspace.id },
    });
  }

  async checkMembershipBelongUserWorkspace(
    workspaceId: string,
    userId: string,
  ) {
    return this.workspaceMemberRepository.findOneOrFail({
      where: {
        userId,
        workspaceId,
      },
    });
  }

  async addMemberToFolder(id: string, memberId: string, user: User) {
    const [folder, member] = await Promise.all([
      this.findOne(id, user),
      this.checkMembershipBelongUserWorkspace(memberId, user.workspace.id),
    ]);

    await this.folderRepository.update(
      { id },
      { members: [...folder.members, member] },
    );
  }

  async removeMemberFromFolder(id: string, memberId: string, user: User) {
    const [folder, member] = await Promise.all([
      this.findOne(id, user),
      this.checkMembershipBelongUserWorkspace(memberId, user.workspace.id),
    ]);

    await this.folderRepository.update(
      { id },
      { members: folder.members.filter((el) => el.id !== member.id) },
    );
  }

  async findOne(id: string, user: User) {
    const folder = await this.folderRepository.findOne({
      where: {
        id,
        workspaceId: user.workspace.id,
      },
      relations: {
        members: true,
      },
    });

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    return folder;
  }

  async update(id: string, data: UpdateFolderDto, user: User) {
    await this.findUniqFolderByName(id, user.workspace.id);

    if (data.name) {
      await this.folderRepository.update(
        { id },
        { name: data.name, slug: trn(data.name) },
      );
    }
  }

  async remove(id: string, user: User) {
    await this.findOne(id, user);

    await this.folderRepository.delete({ id });
  }
}
