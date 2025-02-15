import { IResponse } from '@/types/typeconstans';
import { EndpointBuilder } from '@reduxjs/toolkit/query';
import { IUserResponse } from '@/types/userTypes';

export const userApi = (builder: EndpointBuilder<any, any, any>) => ({
  getUser: builder.query<IResponse<IUserResponse>, void>({
    query: () => `/user`,
    providesTags: ['User'],
  }),
  logout: builder.mutation({
    query: () => ({
      url: '/auth/logout',
      method: 'POST',
    }),
    invalidatesTags: ['User'],
  }),
});
