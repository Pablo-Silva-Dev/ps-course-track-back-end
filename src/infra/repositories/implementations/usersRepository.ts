import { Injectable } from "@nestjs/common";
import { User } from "src/infra/entities/User";
import { PrismaService } from "../../services/prismaService";
import { IUsersRepository } from "../interfaces/usersRepository";

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}
  async createUser({ cpf, email, password, name, phone }: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        cpf: cpf,
        email: email,
        name: name,
        password: password,
        phone: phone,
      },
    });
  }
  async listUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
   include:{
    commentaries: true
   }
    })
    return users as never
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
  async getUserByEmail(userEmail: string): Promise<void | User> {
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
  updateUser(
    userId: string,
    updateData: { name?: string; phone?: string; password?: string }
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }
  deleteUser(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
