import {apiSlice} from '../../../store';
import {Credentials, User} from '../login.types';

export const authEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<User, Credentials>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const {useLoginMutation} = authEndpoints;
