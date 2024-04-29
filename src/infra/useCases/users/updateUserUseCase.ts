import { Injectable, NotFoundException } from "@nestjs/common";
import { hash } from "bcryptjs";
import { IUpdateUserDTO } from "src/infra/dtos/UserDTO";
import { UsersRepository } from "../../repositories/implementations/usersRepository";

@Injectable()
export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(userId: string, { password, phone }: IUpdateUserDTO) {
    const user = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const PASSWORD_ENCRYPTION_SALT_LEVEL = 6;

    const encryptedPassword = await hash(
      password,
      PASSWORD_ENCRYPTION_SALT_LEVEL
    );

    const updatedUser = await this.usersRepository.updateUser(userId, {
      password: encryptedPassword,
      phone,
    });
    return updatedUser;
  }
}
