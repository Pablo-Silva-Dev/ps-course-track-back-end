import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/implementations/usersRepository";

const PASSWORD_ENCRYPTION_SALT_LEVEL = 6;

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ cpf, email, password, name, phone }: User) {
    const userEmailAlreadyExists =
      await this.usersRepository.getUserByEmail(email);

    const userCpfAlreadyExists = await this.usersRepository.getUserByCpf(cpf);

    if (userEmailAlreadyExists || userCpfAlreadyExists) {
      throw new ConflictException(
        "An user with the same email or cpf provided already exists"
      );
    }

    const encryptedPassword = await hash(
      password,
      PASSWORD_ENCRYPTION_SALT_LEVEL
    );

    await this.usersRepository.createUser({
      name,
      email,
      cpf,
      phone,
      password: encryptedPassword,
    });
  }
}
