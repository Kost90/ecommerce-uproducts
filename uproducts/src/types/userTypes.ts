export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  telephone: string;
}

export interface IUserResponse {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  address?: {
    id: string;
    city: string;
    street: string;
    number: string;
    country: string;
    postalCode: string;
  };
}
