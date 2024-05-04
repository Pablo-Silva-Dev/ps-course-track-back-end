interface ICreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
  isAdmin?: boolean;
}

interface IUpdateUserDTO {
  phone?: string;
  password?: string;
}

export { ICreateUserDTO, IUpdateUserDTO };
