import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcryptjs";
import { ICreateUserDTO } from "src/infra/dtos/UserDTO";
import { UsersRepository } from "../../repositories/implementations/usersRepository";

const PASSWORD_ENCRYPTION_SALT_LEVEL = 6;

@Injectable()
export class CreateAdminUserUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ cpf, email, password, name, phone }: ICreateUserDTO) {
    const userEmailAlreadyExists =
      await this.usersRepository.getUserByEmail(email);

    const userCpfAlreadyExists = await this.usersRepository.getUserByCpf(cpf);

    const userPhoneAlreadyExists =
      await this.usersRepository.getUserByPhone(phone);

    if (userEmailAlreadyExists || userCpfAlreadyExists) {
      throw new ConflictException(
        "An user with the same email or cpf provided already exists"
      );
    }

    if (userPhoneAlreadyExists) {
      throw new ConflictException(
        "An user with the linked phone provided already exists"
      );
    }

    const encryptedPassword = await hash(
      password,
      PASSWORD_ENCRYPTION_SALT_LEVEL
    );

    await this.usersRepository.createUserAdmin({
      name,
      email,
      cpf,
      phone,
      password: encryptedPassword,
      isAdmin: true,
    });
  }
}
