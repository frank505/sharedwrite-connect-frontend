import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const v1Api = createApi({
  // reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:8000/api/v1' }),
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (body) => ({
        url: '/user/register',
        method: 'POST',
        body
  }),
})
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserRegisterMutation } = v1Api;
