import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userApi } from './userApi/userApi';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    credentials: 'include',
    prepareHeaders: (headers) => {
      headers.set('x-auth-key', process.env.NEXT_PUBLIC_ACCESS_KEY || '');
      headers.set('x-auth-user', process.env.NEXT_PUBLIC_ACCESS_NAME || '');
      return headers;
    },
  }),
  endpoints: (build) => ({
    ...userApi(build),
  }),
  tagTypes: ['User'],
  keepUnusedDataFor: 300,
  // refetchOnMountOrArgChange: true,
});

export const { useGetUserQuery, useLoginMutation, useLogoutMutation } = api;
