import { randomUUID } from 'crypto';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, argon2id } from 'argon2';

import { RoleEnum } from '../../../common/enum/role.enum';
import Role from '../../../database/entities/access/roles.entity';
import User from '../../../database/entities/access/user.entity';
import { CreateUserDto } from '../../dtos/access/users/create-user.dto';
import { PageOptionsDto } from '../../dtos/page/dto/page-options.dto';
import {
  UpdateProfileDto,
  UpdateUserDto,
} from '../../dtos/access/users/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return hash(password, {
      type: argon2id,
    });
  }

  async create(data: CreateUserDto) {
    const { roleId, password, ...payload } = data;

    await this.checkEmailUnique(data.email);

    const role = await this.roleRepository.findOneByOrFail({ id: roleId });

    return this.userRepository.save({
      id: randomUUID(),
      ...payload,
      password: await this.hashPassword(password),
      role,
    });
  }

  async checkEmailUnique(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (user) {
      throw new BadRequestException('Email mast be unique');
    }
  }

  async profile(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        profileImage: true,
        role: true,
        workspace: {
          workspaceMembers: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(data: UpdateProfileDto, user: User): Promise<User> {
    if (data?.email) {
      await this.checkEmailUnique(data.email);

      user.email = data.email;
    }

    return this.userRepository.save({
      ...data,
      ...user,
    });
  }

  findAll(page: PageOptionsDto) {
    return this.userRepository.findAndCount({
      relations: {
        role: true,
      },
      take: page.limit,
      skip: page.skip,
    });
  }

  findAllRoles() {
    return this.roleRepository.find();
  }

  async updateUserRole(userId: string, roleId: string) {
    await Promise.all([
      this.userRepository.findOneByOrFail({ id: userId }),
      this.roleRepository.findOneByOrFail({ id: roleId }),
    ]);

    return this.userRepository.update({ id: userId }, { role: { id: roleId } });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Cart Not Found');
    }

    return user;
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.findOne(id);

    if (data?.email && user.email !== data.email) {
      await this.checkEmailUnique(data.email);

      user.email = data.email;
    }

    if (data?.roleId) {
      user.role = await this.roleRepository.findOneByOrFail({
        id: data.roleId,
      });
    }

    return this.userRepository.save({
      ...data,
      ...user,
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (user.role.slug === RoleEnum.ADMIN) {
      return user;
    }

    return this.userRepository.delete(id);
  }
}
