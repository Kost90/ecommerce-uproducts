import { IResponse } from '@/types/typeconstans';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { IUserResponse } from '@/types/userTypes';

export const userApi = (builder: EndpointBuilder<any, any, any>) => ({
  getUser: builder.query<IResponse<IUserResponse>, void>({
    query: () => `/user`,
    providesTags: ['User'],
  }),
  login: builder.mutation<IResponse<IUserResponse>, { email: string; password: string }>({
    query: (credentials) => ({
      url: '/auth/login',
      method: 'POST',
      body: credentials,
    }),
    invalidatesTags: ['User'],
  }),
  logout: builder.mutation({
    query: () => ({
      url: '/auth/logout',
      method: 'POST',
    }),
    invalidatesTags: ['User'],
  }),
});
