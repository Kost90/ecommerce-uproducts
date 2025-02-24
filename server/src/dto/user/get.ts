import { Address, User } from '@prisma/client';
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
  telephone: string;
  addressId?: string;
  role: string;
  address?: {
    city: string;
    street: string;
    number: string;
    country: string;
    postalCode: string;
  };

  constructor(data: IUserBase & { address?: Address | null }) {
    this.id = data.id;
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.telephone = data.telephone;
    this.addressId = data.addressId || undefined;
    this.role = data.role;

    if (data.address) {
      this.address = {
        city: data.address.city,
        street: data.address.street,
        number: data.address.number,
        country: data.address.country,
        postalCode: data.address.postalCode,
      };
    }
  }
}

export default UserDTO;
