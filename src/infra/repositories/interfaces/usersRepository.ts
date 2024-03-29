import { User } from "../../entities/User";

export interface IUsersRepository {
  createUser({name, cpf, email, password, phone}: User): Promise<void>;
  listUsers(): Promise<User[]>;
  getUserById(userId: string): Promise<User | void>;
  getUserByEmail(userId: string): Promise<User | void>;
  getUserByCpf(userId: string): Promise<User | void>;
  updateUser(
    userId: string,
    updateData: { name?: string; phone?: string; password?: string }
  ): Promise<void>;
  deleteUser(userId: string): Promise<void>;
}
