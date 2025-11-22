import { Injectable } from '@nestjs/common';

import { Prisma } from 'generated/prisma';
import { PrismaService } from '../prisma.service';
import { UserDto } from '@clinic-application/shared';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<UserDto> {
    const newUser = await this.prismaService.user.create({ data });

    return newUser;
  }

  async findAll(): Promise<UserDto[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: number): Promise<UserDto> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<UserDto> {
    return await this.prismaService.user.findFirst({
      where: { email },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<UserDto> {
    return await this.prismaService.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prismaService.user.delete({
      where: { id },
    });
  }
}
