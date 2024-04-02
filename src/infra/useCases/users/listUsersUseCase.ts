import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../repositories/implementations/usersRepository";

@Injectable()
export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute() {
    const users = await this.usersRepository.listUsers();
    return users;
  }
}
