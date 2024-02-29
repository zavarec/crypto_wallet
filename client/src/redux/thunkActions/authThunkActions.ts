import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AuthStateType, UserSignInType, UserSignUpType } from '../../types/authType';
import authService from '../../services/authService';

export const checkTokenThunk = createAsyncThunk<AuthStateType>('auth/checkToken', async () =>
  authService.checkToken(),
);

export const signInThunk = createAsyncThunk<AuthStateType, UserSignInType>(
  'auth/login',
  async (data) => authService.signIn(data),
);

export const signUpThunk = createAsyncThunk<AuthStateType, UserSignUpType>(
  'auth/signup',
  async (data) => authService.signUp(data),
);

export const logOutThunk = createAsyncThunk('auth/logout', async () => void authService.logOut());
