import { User } from '@prisma/client';
import { IUserBase, IUserResponse } from '../../types/userTypes';

class UserDTO implements IUserBase {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  telephone: string;
  addressId: string | null;
  role: string;

  constructor(data: User) {
    this.id = data.id as string;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.password = data.password;
    this.telephone = data.telephone;
    this.addressId = data.addressId;
    this.role = data.role;
  }
}

export class UserResponseDTO implements IUserResponse {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  addressId: string | null;
  role: string;

  constructor(data: IUserResponse) {
    this.id = data.id as string;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.addressId = data.addressId;
    this.role = data.role;
  }
}

export default UserDTO;
