import { Injectable } from "@nestjs/common";
import { ICreateUserDTO, IUpdateUserDTO } from "src/infra/dtos/UserDTO";
import { User } from "src/infra/entities/User";
import { PrismaService } from "../../services/prismaService";
import { IUsersRepository } from "../interfaces/usersRepository";

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async createUser({
    cpf,
    email,
    password,
    name,
    phone,
  }: ICreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const phoneAlreadyExists = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    });

    const cpfAlreadyExists = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (!emailAlreadyExists && !phoneAlreadyExists && !cpfAlreadyExists) {
      const user = await this.prisma.user.create({
        data: {
          cpf: cpf,
          email: email,
          name: name,
          password: password,
          phone: phone,
        },
      });
      return user;
    }
  }
  async createUserAdmin({
    cpf,
    email,
    password,
    name,
    phone,
    isAdmin,
  }: ICreateUserDTO): Promise<User> {
    const emailAlreadyExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const phoneAlreadyExists = await this.prisma.user.findUnique({
      where: {
        phone,
      },
    });

    const cpfAlreadyExists = await this.prisma.user.findUnique({
      where: {
        cpf,
      },
    });

    if (!emailAlreadyExists && !phoneAlreadyExists && !cpfAlreadyExists) {
      const adminUser = await this.prisma.user.create({
        data: {
          cpf: cpf,
          email: email,
          name: name,
          password: password,
          phone: phone,
          isAdmin: true,
        },
      });
      return adminUser;
    }
  }
  async listUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        commentaries: true,
      },
    });
    return users as never;
  }
  async getUserById(userId: string): Promise<void | User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      return user;
    }
  }
  async getUserByEmail(userEmail: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (user) {
      return user;
    }
  }
  async getUserByCpf(userCpf: string): Promise<void | User> {
    const user = await this.prisma.user.findUnique({
      where: {
        cpf: userCpf,
      },
    });

    if (user) {
      return user;
    }
  }
  async getUserByPhone(userPhone: string): Promise<void | User> {
    const user = await this.prisma.user.findUnique({
      where: {
        phone: userPhone,
      },
    });

    if (user) {
      return user;
    }
  }
  async updateUser(
    userId: string,
    { password, phone }: IUpdateUserDTO
  ): Promise<User | void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password,
          phone,
        },
      });
      return updatedUser;
    }
  }
  async deleteUser(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    }
  }
}
