export interface IUserBase {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  telephone: string;
  addressId?: string | null | undefined;
  role: string;
}

export interface IUserResponse extends Omit<IUserBase, 'password'> {}

// export type IUserWithOptionalFields = Omit<IUserBase, 'address' | 'profile_photo'> & {
//   address?: string;
//   profile_photo?: string | null;
// };
