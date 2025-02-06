import { User } from '@prisma/client';

export class UserResponseDTO {
  private firstName: string;
  private lastName: string;
  private id: string;

  constructor(data: User) {
    this.firstName = data.firstname;
    this.lastName = data.lastname;
    this.id = data.id;
  }
}
