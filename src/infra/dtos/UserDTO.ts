interface ICreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  password: string;
}

interface IUpdateUserDTO {
  phone?: string;
  password?: string;
}

export { ICreateUserDTO, IUpdateUserDTO };
