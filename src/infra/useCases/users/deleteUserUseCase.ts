import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../../repositories/implementations/usersRepository";

@Injectable()
export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(userId: string) {
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException("No user found for the provided userId");
    }

    await this.usersRepository.deleteUser(userId);
  }
}
