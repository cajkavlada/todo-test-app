import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'src/store';
import {User} from '../login.types';
import {ActionMeta} from 'src/store/store.types';

function getInitialAuthState(): User | null {
  const serializedUser = sessionStorage.getItem('authUser');
  if (serializedUser) {
    return JSON.parse(serializedUser);
  }
  return null;
}

function isSuccessLoginAction({meta}: PayloadAction<User, string, ActionMeta>) {
  return meta && meta.requestStatus === 'fulfilled' && meta.arg.endpointName === 'login';
}

function isUnathorizedAction({payload}: PayloadAction<any, string>) {
  return payload?.status === 401;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    logout: () => {
      sessionStorage.removeItem('authUser');
      return null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isSuccessLoginAction, (_, {payload}: PayloadAction<User, string>) => {
      sessionStorage.setItem('authUser', JSON.stringify(payload));
      return payload;
    });
    builder.addMatcher(isUnathorizedAction, () => {
      sessionStorage.removeItem('authUser');
      return null;
    });
  },
});

export const {logout} = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => !!state.auth;

export const selectUserId = (state: RootState) => state.auth?.id;

export const selectUserInfo = (state: RootState) => state.auth;

export const selectFirstName = (state: RootState) => state.auth?.firstName;
