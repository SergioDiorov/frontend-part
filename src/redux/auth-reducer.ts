import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { AuthResponseType, userAuthApi } from 'api/api';
import { UserSignInType, UserSignUpType, responseErrorType } from 'types/types';

export type InitialState = {
  userId: string | null;
  requestErrors: string | null;
  isLoading: boolean;
};

const initialState: InitialState = {
  userId: null,
  requestErrors: null,
  isLoading: false,
};

type SignActionType = Pick<AuthResponseType, 'message' | 'user'>;

export const signUpUserTh = createAsyncThunk(
  'auth/signUpUser',
  async (userCredentials: UserSignUpType) => {
    try {
      const response = await userAuthApi.signUp(userCredentials);
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error: unknown) {
      let errorResponse = error as responseErrorType;
      return errorResponse.response.data;
    }
  }
);

export const signInUserTh = createAsyncThunk(
  'auth/signInUser',
  async (userCredentials: UserSignInType) => {
    try {
      const response = await userAuthApi.signIn(userCredentials);
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error: unknown) {
      let errorResponse = error as responseErrorType;
      return errorResponse.response.data;
    }
  }
);

export const signOutUserTh = createAsyncThunk('auth/signOutUser', async () => {
  try {
    await userAuthApi.signOut();
    localStorage.removeItem('token');
  } catch (error: unknown) {
    let errorResponse = error as responseErrorType;
    return errorResponse.response.data.message;
  }
});

export const checkUserAuthTh = createAsyncThunk(
  'auth/checkUserAuth',
  async () => {
    try {
      const response = await userAuthApi.refreshToken();
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    } catch (error: unknown) {
      let errorResponse = error as responseErrorType;
      return errorResponse.response.data;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      signUpUserTh.fulfilled,
      (state, action: PayloadAction<SignActionType>) => {
        state.userId = action.payload.user?.id || null;
        state.requestErrors =
          action.payload.message === 'SUCCESS' ? null : action.payload.message;
      }
    );

    builder.addCase(
      signInUserTh.fulfilled,
      (state, action: PayloadAction<SignActionType>) => {
        state.userId = action.payload.user?.id || null;
        state.requestErrors =
          action.payload.message === 'SUCCESS' ? null : action.payload.message;
      }
    );

    builder.addCase(signOutUserTh.fulfilled, (state) => {
      state.userId = null;
      state.requestErrors = null;
    });

    builder.addCase(
      checkUserAuthTh.fulfilled,
      (state, action: PayloadAction<SignActionType>) => {
        state.userId = action.payload.user?.id || null;
        state.requestErrors =
          action.payload.message === 'SUCCESS' ? null : action.payload.message;
        state.isLoading = false;
      }
    );
    builder.addCase(checkUserAuthTh.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export default authSlice.reducer;
