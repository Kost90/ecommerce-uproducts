import { IResponse } from '@/types/typeconstans';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { IUser, IUserResponse } from '@/types/userTypes';

export const userApi = (builder: EndpointBuilder<any, any, any>) => ({
  getUser: builder.query<IResponse<IUserResponse>, void>({
    query: () => `/user`,
  }),
  createUser: builder.mutation({
    query: (userData: IUser) => ({
      url: '/user',
      method: 'POST',
      body: userData,
    }),
  }),
});
