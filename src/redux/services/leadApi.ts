import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const urlAPI = 'https://largezen-server.up.railway.app';

export const leadApi = createApi({
  reducerPath: 'leadApi',
  baseQuery: fetchBaseQuery({baseUrl: urlAPI}),
  tagTypes: ['LEADS'],
  endpoints: builder => ({
    // Leads by user
    leadByUser: builder.query({
      query: ({token, user_id}) => ({
        url: `/lead/${user_id}`,
        method: 'GET',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['LEADS'],
    }),

    // Add Lead
    addLeadByUser: builder.mutation({
      query: ({token, user_id, name, phone, address, needed, meeting}) => ({
        url: '/lead',
        method: 'POST',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          user_id,
          name,
          phone,
          address,
          requirement: needed,
          meeting_date: meeting,
          lead_status: 0,
          meeting_status: 0,
        }),
      }),
      invalidatesTags: ['LEADS'],
    }),

    // Update Lead
    updateLeadByUser: builder.mutation({
      query: ({token, id, props}) => ({
        url: `/lead/${id}`,
        method: 'PATCH',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(props),
      }),
      invalidatesTags: ['LEADS'],
    }),

    // Delete Lead
    deleteLeadByUser: builder.mutation({
      query: ({token, id}) => ({
        url: `/lead/${id}`,
        method: 'DELETE',
        cache: 'no-cache',
        referrerPolicy: 'no-referrer',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['LEADS'],
    }),
  }),
});

export const {
  useLeadByUserQuery,
  useAddLeadByUserMutation,
  useUpdateLeadByUserMutation,
  useDeleteLeadByUserMutation,
} = leadApi;
