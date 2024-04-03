import { Injectable, NotFoundException } from "@nestjs/common";
import { hash } from "bcryptjs";
import { UsersRepository } from "../../repositories/implementations/usersRepository";

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(userId: string, password: string) {
    try {
      const user = await this.usersRepository.getUserById(userId);

      if (!user) {
        throw new NotFoundException("User not found");
      }

      const PASSWORD_ENCRYPTION_SALT_LEVEL = 6;

      const encryptedPassword = await hash(
        password,
        PASSWORD_ENCRYPTION_SALT_LEVEL
      );

      await this.usersRepository.updateUser(userId, encryptedPassword);
    } catch (error) {
      console.log(error);
    }
  }
}
