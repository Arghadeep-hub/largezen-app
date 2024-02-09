import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const urlAPI = 'https://staging-largezen.up.railway.app';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({baseUrl: urlAPI}),
  tagTypes: ['USER'],
  endpoints: builder => ({
    // Get Single User
    singleUserDetails: builder.query({
      query: ({token, user_id}) => ({
        url: `/user/${user_id}`,
        method: 'GET',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['USER'],
    }),

    // Update Single User
    updateSingleUser: builder.mutation({
      query: ({token, user_id, props}) => ({
        url: `/user/${user_id}`,
        method: 'PATCH',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(props),
      }),
      invalidatesTags: ['USER'],
    }),
  }),
});

export const {useSingleUserDetailsQuery, useUpdateSingleUserMutation} = userApi;
