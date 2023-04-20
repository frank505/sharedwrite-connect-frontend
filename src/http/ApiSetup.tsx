import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const v1Api = createApi({
  reducerPath: 'v1Api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:80/api/v1' }),
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (body) => ({
        url: '/user/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['userRegister'],
      // transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    passcodeVerify: builder.mutation({
      query: (body) => ({
        url: '/user/verify-account',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['passcodeVerify'],
      // transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    resendVerifyAccount: builder.mutation({
      query: (body) => ({
        url: '/user/resend-email-verification-token',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['resendVerifyAccount'],
      // transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
  }),
  tagTypes: ['resendVerifyAccount', 'passcodeVerify', 'userRegister'],
})


export const { useUserRegisterMutation, usePasscodeVerifyMutation, useResendVerifyAccountMutation } = v1Api;
