import { API } from '@/api/Api';
import { IResponse } from '@/types/typeconstans';
import { IUserResponse } from '@/types/userTypes';

const url = process.env.NEXT_PUBLIC_URL;

class UserService extends API {
  constructor(baseurl: string) {
    super(baseurl);
  }

  async getUserData(): Promise<IResponse<IUserResponse>> {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response: IResponse<IUserResponse> = await this.fetch({
        path: 'user',
        signal: signal,
      });

      return response;
    } catch (error) {
      throw new Error(`Failed to fetch user data: ${error}`);
    }
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService(url!);
