import { API } from '@/api/Api';
import { IResponse } from '@/types/typeconstans';
import { IUserResponse, IUser } from '@/types/userTypes';

const url = process.env.NEXT_PUBLIC_URL;

class AuthorizationService extends API {
  constructor(baseurl: string) {
    super(baseurl);
  }

  async signUp(user: IUser): Promise<IResponse<IUserResponse>> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: IResponse<IUserResponse> = await this.fetch({
        path: 'auth/register',
        method: 'POST',
        signal: signal,
        body: JSON.stringify(user),
      });
      return response;
    } catch (error) {
      throw new Error(`Can't create a user ${error}`);
    }
  }

  async signIn(credentials: { password: string; email: string }): Promise<IResponse<IUserResponse>> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: IResponse<IUserResponse> = await this.fetch({
        path: 'auth/login',
        method: 'POST',
        signal: signal,
        body: JSON.stringify(credentials),
      });
      return response;
    } catch (error) {
      throw new Error(`Can't login: ${error}`);
    }
  }

  async signOut(): Promise<void> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      await this.fetch({
        path: 'auth/logout',
        method: 'POST',
        signal: signal,
      });
    } catch (error) {
      throw new Error(`Can't logout: ${error}`);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthorizationService(url!);
