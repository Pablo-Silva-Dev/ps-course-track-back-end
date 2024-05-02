import { ICreateUserDTO, IUpdateUserDTO } from "src/infra/dtos/UserDTO";
import { User } from "../../entities/User";

export interface IUsersRepository {
  createUser({
    name,
    cpf,
    email,
    password,
    phone,
  }: ICreateUserDTO): Promise<User>;
  listUsers(): Promise<User[]>;
  getUserById(userId: string): Promise<User | void>;
  getUserByEmail(userId: string): Promise<User>;
  getUserByCpf(userId: string): Promise<User | void>;
  updateUser(
    userId: string,
    { password, phone }: IUpdateUserDTO
  ): Promise<User | void>;
  deleteUser(userId: string): Promise<void>;
}
